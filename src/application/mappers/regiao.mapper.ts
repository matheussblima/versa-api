import { Regiao } from '../../domain/entities/regiao.entity';
import { RegiaoResponseDto } from '../dto/regiao-response.dto';
import { CreateRegiaoDto } from '../dto/create-regiao.dto';
import { UpdateRegiaoDto } from '../dto/update-regiao.dto';

export class RegiaoMapper {
  static toEntity(dto: CreateRegiaoDto, id?: string): Regiao {
    return Regiao.create(dto.sigla, dto.nome, id);
  }

  static toResponseDto(entity: Regiao): RegiaoResponseDto {
    return {
      id: entity.id,
      sigla: entity.sigla,
      nome: entity.nome,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toUpdateEntity(dto: UpdateRegiaoDto): Partial<Regiao> {
    const updateData: Partial<Regiao> = {
      ...(dto.sigla !== undefined && { sigla: dto.sigla }),
      ...(dto.nome !== undefined && { nome: dto.nome }),
    };

    return updateData;
  }
}
