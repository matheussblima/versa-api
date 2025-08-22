import { PontoDeMedicao } from '../../domain/entities/ponto-de-medicao.entity';
import { PontoDeMedicaoResponseDto } from '../dto/ponto-de-medicao-response.dto';

export class PontoDeMedicaoMapper {
  static toResponseDto(
    pontoDeMedicao: PontoDeMedicao,
  ): PontoDeMedicaoResponseDto {
    return {
      id: pontoDeMedicao.id,
      codigo: pontoDeMedicao.codigo,
      descricao: pontoDeMedicao.descricao,
      createdAt: pontoDeMedicao.createdAt,
      updatedAt: pontoDeMedicao.updatedAt,
    };
  }

  static toResponseDtoList(
    pontosDeMedicao: PontoDeMedicao[],
  ): PontoDeMedicaoResponseDto[] {
    return pontosDeMedicao.map((pontoDeMedicao) =>
      this.toResponseDto(pontoDeMedicao),
    );
  }
}
