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
import { PontoDeMedicao } from '../../../domain/entities/ponto-de-medicao.entity';
import {
  IPontoDeMedicaoRepository,
  PONTO_DE_MEDICAO_REPOSITORY,
} from '../../../domain/repositories/ponto-de-medicao.repository.interface';

@Injectable()
export class CreateSubUnidadeUseCase {
  constructor(
    @Inject(SUBUNIDADE_REPOSITORY)
    private readonly subUnidadeRepository: SubUnidadeRepositoryInterface,
    @Inject(CCEE_PONTO_MEDICAO_SERVICE)
    private readonly cceePontoMedicaoService: ICceePontoMedicaoService,
    @Inject(PONTO_DE_MEDICAO_REPOSITORY)
    private readonly pontoMedicaoRepository: IPontoDeMedicaoRepository,
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
      const pontosMedicao =
        await this.cceePontoMedicaoService.fetchPontosMedicaoBySubUnidadeId(
          createdSubUnidade.id,
        );

      const pontosMedicaoResponse = pontosMedicao.map((pontoMedicao) =>
        PontoDeMedicao.create(
          pontoMedicao.codigo,
          createdSubUnidade.id,
          pontoMedicao.descricao,
        ),
      );

      for (const pontoMedicao of pontosMedicaoResponse) {
        await this.pontoMedicaoRepository.create(pontoMedicao);
      }
    } catch (error) {
      console.error('Erro ao buscar pontos de medição do CCEE:', error);
    }

    return createdSubUnidade;
  }
}
