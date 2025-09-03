import { Injectable, Inject, Logger } from '@nestjs/common';
import {
  ICceePldService,
  CCEE_PLD_SERVICE,
} from '../../../domain/services/ccee-pld.service';
import {
  IPldRepository,
  PLD_REPOSITORY,
} from '../../../domain/repositories/pld.repository.interface';

export interface FetchPldSyncParams {
  referenceDate: string;
  forceUpdate?: boolean;
  tipo?: string;
}

export interface FetchPldSyncResult {
  referenceDate: string;
  totalRecords: number;
  savedRecords: number;
  skippedRecords: number;
  errors: string[];
  startedAt: string;
  finishedAt: string;
  processingTimeMs: number;
}

@Injectable()
export class FetchPldSyncUseCase {
  private readonly logger = new Logger(FetchPldSyncUseCase.name);

  constructor(
    @Inject(CCEE_PLD_SERVICE)
    private readonly cceePldService: ICceePldService,
    @Inject(PLD_REPOSITORY)
    private readonly pldRepository: IPldRepository,
  ) {}

  async execute(params: FetchPldSyncParams): Promise<FetchPldSyncResult> {
    const startTime = Date.now();
    const startedAt = new Date().toISOString();

    this.logger.log(
      `Iniciando busca de PLD para ${params.referenceDate}${
        params.forceUpdate ? ' (forçando atualização)' : ''
      }`,
    );

    try {
      const codigoPerfilAgente = process.env.CCEE_CODIGO_PERFIL_AGENTE || '';
      if (!codigoPerfilAgente) {
        throw new Error('CCEE_CODIGO_PERFIL_AGENTE não configurado');
      }

      // Verificar se já existem dados para a data (se não for forceUpdate)
      if (!params.forceUpdate) {
        const existingPlds = await this.pldRepository.findByDataHora(
          new Date(params.referenceDate),
        );
        if (existingPlds.length > 0) {
          this.logger.log(
            `PLD já existe para ${params.referenceDate}. Total de registros: ${existingPlds.length}`,
          );
          return {
            referenceDate: params.referenceDate,
            totalRecords: existingPlds.length,
            savedRecords: 0,
            skippedRecords: existingPlds.length,
            errors: [],
            startedAt,
            finishedAt: new Date().toISOString(),
            processingTimeMs: Date.now() - startTime,
          };
        }
      }

      // Se for forceUpdate, deletar registros existentes
      if (params.forceUpdate) {
        await this.pldRepository.deleteByDataHora(
          new Date(params.referenceDate),
        );
        this.logger.log(
          `Registros existentes deletados para ${params.referenceDate}`,
        );
      }

      const result = await this.fetchPldFromCcee(
        params.referenceDate,
        codigoPerfilAgente,
        params.tipo,
      );

      const finishedAt = new Date().toISOString();
      const processingTimeMs = Date.now() - startTime;

      this.logger.log(
        `Busca de PLD concluída para ${params.referenceDate}. ` +
          `Total de registros: ${result.totalRecords}, ` +
          `Salvos: ${result.savedRecords}, ` +
          `Pulados: ${result.skippedRecords}, ` +
          `Erros: ${result.errors.length}`,
      );

      return {
        referenceDate: params.referenceDate,
        ...result,
        startedAt,
        finishedAt,
        processingTimeMs,
      };
    } catch (error) {
      this.logger.error(
        `Erro na busca de PLD para ${params.referenceDate}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async fetchPldFromCcee(
    referenceDate: string,
    codigoPerfilAgente: string,
    tipo: string = 'HORARIO',
  ): Promise<{
    totalRecords: number;
    savedRecords: number;
    skippedRecords: number;
    errors: string[];
  }> {
    let totalRecords = 0;
    let savedRecords = 0;
    let skippedRecords = 0;
    const errors: string[] = [];

    try {
      const plds = await this.cceePldService.fetchPLD({
        dataInicio: referenceDate,
        dataFim: referenceDate,
        codigoPerfilAgente,
        tipo,
        numero: 1,
        quantidadeItens: 1000,
      });

      totalRecords = plds.length;
      this.logger.log(
        `Total de ${plds.length} registros PLD encontrados da CCEE`,
      );

      for (const pld of plds) {
        try {
          const exists = await this.pldRepository.existsByDataHoraAndSubmercado(
            pld.dataHora,
            pld.codigoSubmercado,
            pld.tipo,
          );

          if (exists) {
            skippedRecords++;
            continue;
          }

          await this.pldRepository.save(pld);
          savedRecords++;
        } catch (error) {
          errors.push(
            `Erro ao salvar PLD ${pld.codigoSubmercado} ${pld.dataHora}: ${error.message}`,
          );
        }
      }
    } catch (error) {
      errors.push(`Erro ao buscar PLD da CCEE: ${error.message}`);
    }

    return {
      totalRecords,
      savedRecords,
      skippedRecords,
      errors,
    };
  }
}
