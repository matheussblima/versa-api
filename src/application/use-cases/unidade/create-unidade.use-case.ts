import { Injectable, Inject } from '@nestjs/common';
import { Unidade } from '../../../domain/entities/unidade.entity';
import {
  IUnidadeRepository,
  UNIDADE_REPOSITORY,
} from '../../../domain/repositories/unidade.repository.interface';
import { CreateUnidadeDto } from '../../dto/create-unidade.dto';
import { UnidadeResponseDto } from '../../dto/unidade-response.dto';
import { UnidadeMapper } from '../../mappers/unidade.mapper';
import {
  ICceePontoMedicaoService,
  CCEE_PONTO_MEDICAO_SERVICE,
} from '../../../domain/services/ccee-ponto-medicao.service';
import { CreatePontoDeMedicaoUseCase } from '../ponto-de-medicao/create-ponto-de-medicao.use-case';

@Injectable()
export class CreateUnidadeUseCase {
  constructor(
    @Inject(UNIDADE_REPOSITORY)
    private readonly unidadeRepository: IUnidadeRepository,
    @Inject(CCEE_PONTO_MEDICAO_SERVICE)
    private readonly cceePontoMedicaoService: ICceePontoMedicaoService,
    private readonly createPontoDeMedicaoUseCase: CreatePontoDeMedicaoUseCase,
  ) {}

  async execute(dto: CreateUnidadeDto): Promise<UnidadeResponseDto> {
    const unidade = Unidade.create(
      dto.nome,
      dto.codigoCCEE,
      dto.grupoEconomico,
    );
    const createdUnidade = await this.unidadeRepository.create(unidade);

    try {
      const pontosMedicaoCcee =
        await this.cceePontoMedicaoService.fetchPontosMedicaoByCodeCcee(
          dto.codigoCCEE,
        );

      for (const pontoMedicao of pontosMedicaoCcee) {
        try {
          await this.createPontoDeMedicaoUseCase.execute({
            codigo: pontoMedicao.codigo,
            descricao: pontoMedicao.descricao,
          });
        } catch (error) {
          console.error(
            `Erro ao criar ponto de medição ${pontoMedicao.codigo}:`,
            error,
          );
        }
      }
    } catch (error) {
      console.error('Erro ao sincronizar pontos de medição do CCEE:', error);
      throw error;
    }

    return UnidadeMapper.toResponseDto(createdUnidade);
  }
}
