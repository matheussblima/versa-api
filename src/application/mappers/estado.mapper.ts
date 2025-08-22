import { Estado } from '../../domain/entities/estado.entity';
import { EstadoResponseDto } from '../dto/estado-response.dto';
import { CreateEstadoDto } from '../dto/create-estado.dto';
import { UpdateEstadoDto } from '../dto/update-estado.dto';
import { RegiaoMapper } from './regiao.mapper';

export class EstadoMapper {
  static toEntity(dto: CreateEstadoDto, id?: string): Estado {
    return Estado.create(dto.sigla, dto.nome, dto.regiaoId, undefined, id);
  }

  static toResponseDto(entity: Estado): EstadoResponseDto {
    return {
      id: entity.id,
      sigla: entity.sigla,
      nome: entity.nome,
      regiaoId: entity.regiaoId,
      regiao: entity.regiao
        ? RegiaoMapper.toResponseDto(entity.regiao)
        : undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toUpdateEntity(dto: UpdateEstadoDto): Partial<Estado> {
    const updateData: Partial<Estado> = {
      ...(dto.sigla !== undefined && { sigla: dto.sigla }),
      ...(dto.nome !== undefined && { nome: dto.nome }),
      ...(dto.regiaoId !== undefined && { regiaoId: dto.regiaoId }),
    };

    return updateData;
  }
}
