import { PLD } from '../../domain/entities/pld.entity';
import { CreatePldDto } from '../dto/create-pld.dto';
import { PldResponseDto } from '../dto/pld-response.dto';

export class PldMapper {
  static toEntity(createPldDto: CreatePldDto): {
    dataHora: Date;
    submercado: string;
    codigoSubmercado: string;
    valor: number;
    unidadeId: string;
    moeda: string;
    tipo: string;
  } {
    return {
      dataHora: new Date(createPldDto.dataHora),
      submercado: createPldDto.submercado,
      codigoSubmercado: createPldDto.codigoSubmercado,
      valor: createPldDto.valor,
      unidadeId: createPldDto.unidadeId,
      moeda: createPldDto.moeda || 'BRL',
      tipo: createPldDto.tipo || 'HORARIO',
    };
  }

  static toResponseDto(pld: PLD): PldResponseDto {
    return {
      id: pld.id,
      dataHora: pld.dataHora.toISOString(),
      submercado: pld.submercado,
      codigoSubmercado: pld.codigoSubmercado,
      valor: pld.valor,
      unidadeId: pld.unidadeId,
      moeda: pld.moeda,
      tipo: pld.tipo,
      createdAt: pld.createdAt.toISOString(),
      updatedAt: pld.updatedAt.toISOString(),
    };
  }

  static toResponseDtoList(plds: PLD[]): PldResponseDto[] {
    return plds.map((pld) => this.toResponseDto(pld));
  }
}
