import { Unidade } from '../../domain/entities/unidade.entity';
import { UnidadeResponseDto } from '../dto/unidade-response.dto';
import { SubUnidadeMapper } from './subunidade.mapper';

export class UnidadeMapper {
  static toResponseDto(unidade: Unidade): UnidadeResponseDto {
    const response: UnidadeResponseDto = {
      id: unidade.id,
      nome: unidade.nome,
      codigoCCEE: unidade.codigoCCEE,
      grupoEconomico: unidade.grupoEconomico,
      createdAt: unidade.createdAt,
      updatedAt: unidade.updatedAt,
    };

    if (unidade.subUnidades && unidade.subUnidades.length > 0) {
      response.subUnidades = unidade.subUnidades.map((subUnidade) =>
        SubUnidadeMapper.toResponseDto(subUnidade),
      );
    }

    return response;
  }

  static toResponseDtoList(unidades: Unidade[]): UnidadeResponseDto[] {
    return unidades.map((unidade) => this.toResponseDto(unidade));
  }
}
