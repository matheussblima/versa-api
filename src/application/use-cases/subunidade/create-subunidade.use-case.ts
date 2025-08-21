import { Injectable, Inject } from '@nestjs/common';
import { SubUnidade } from '../../../domain/entities/subunidade.entity';
import {
  SubUnidadeRepositoryInterface,
  SUBUNIDADE_REPOSITORY,
} from '../../../domain/repositories/subunidade.repository.interface';
import { CreateSubUnidadeDto } from '../../dto/create-subunidade.dto';
import {
  CCEE_PONTO_MEDICAO_SERVICE,
  ICceePontoMedicaoService,
} from '../../../domain/services/ccee-ponto-medicao.service';

@Injectable()
export class CreateSubUnidadeUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
    @Inject(CCEE_PONTO_MEDICAO_SERVICE)
    private readonly cceePontoMedicaoService: ICceePontoMedicaoService,
  ) {}

  async execute(dto: CreateSubUnidadeDto): Promise<SubUnidade> {
    const subUnidade = SubUnidade.create(
      dto.nome,
      dto.unidadeId,
      dto.descricao,
      dto.estadoId,
      undefined,
      dto.regiaoId,
      undefined,
      dto.apeRemoto,
      dto.apeLocal,
      dto.codigoI5,
      dto.codigoI0,
      dto.codigoI100,
      dto.codigoConv,
    );

    const createdSubUnidade =
      await this.subUnidadeRepository.create(subUnidade);

    try {
      await this.cceePontoMedicaoService.fetchAndSavePontosMedicaoBySubUnidadeId(
        createdSubUnidade.id,
      );
    } catch (error) {
      console.error('Erro ao buscar pontos de medição do CCEE:', error);
    }

    return createdSubUnidade;
  }
}
