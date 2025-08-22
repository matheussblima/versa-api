import { SubUnidade } from '../../domain/entities/subunidade.entity';
import { SubUnidadeResponseDto } from '../dto/subunidade-response.dto';
import { EstadoResponseDto } from '../dto/estado-response.dto';
import { RegiaoResponseDto } from '../dto/regiao-response.dto';
import { PontoDeMedicaoResponseDto } from '../dto/ponto-de-medicao-response.dto';

export class SubUnidadeMapper {
  static toResponseDto(subUnidade: SubUnidade): SubUnidadeResponseDto {
    const response: SubUnidadeResponseDto = {
      id: subUnidade.id,
      nome: subUnidade.nome,
      descricao: subUnidade.descricao,
      estadoId: subUnidade.estadoId,
      regiaoId: subUnidade.regiaoId,
      apeRemoto: subUnidade.apeRemoto,
      apeLocal: subUnidade.apeLocal,
      codigoI5: subUnidade.codigoI5,
      codigoI0: subUnidade.codigoI0,
      codigoI100: subUnidade.codigoI100,
      codigoConv: subUnidade.codigoConv,
      cnpj: subUnidade.cnpj,
      unidadeId: subUnidade.unidadeId,
      pontoDeMedicaoId: subUnidade.pontoDeMedicaoId,
      createdAt: subUnidade.createdAt,
      updatedAt: subUnidade.updatedAt,
    };

    // Mapear estado se existir
    if (subUnidade.estado) {
      response.estado = {
        id: subUnidade.estado.id,
        sigla: subUnidade.estado.sigla,
        nome: subUnidade.estado.nome,
        regiaoId: subUnidade.estado.regiaoId,
        createdAt: subUnidade.estado.createdAt,
        updatedAt: subUnidade.estado.updatedAt,
      } as EstadoResponseDto;
    }

    // Mapear região se existir
    if (subUnidade.regiao) {
      response.regiao = {
        id: subUnidade.regiao.id,
        sigla: subUnidade.regiao.sigla,
        nome: subUnidade.regiao.nome,
        createdAt: subUnidade.regiao.createdAt,
        updatedAt: subUnidade.regiao.updatedAt,
      } as RegiaoResponseDto;
    }

    // Mapear ponto de medição se existir
    if (subUnidade.pontoDeMedicao) {
      response.pontoDeMedicao = {
        id: subUnidade.pontoDeMedicao.id,
        codigo: subUnidade.pontoDeMedicao.codigo,
        descricao: subUnidade.pontoDeMedicao.descricao,
        createdAt: subUnidade.pontoDeMedicao.createdAt,
        updatedAt: subUnidade.pontoDeMedicao.updatedAt,
      } as PontoDeMedicaoResponseDto;
    }

    return response;
  }

  static toResponseDtoList(subUnidades: SubUnidade[]): SubUnidadeResponseDto[] {
    return subUnidades.map((subUnidade) => this.toResponseDto(subUnidade));
  }
}
