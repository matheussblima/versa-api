import { Injectable, Inject } from '@nestjs/common';
import { MedidaQuinzeMinutos } from '../../domain/entities/medida-quinze-minutos.entity';
import { MedidaCincoMinutos } from '../../domain/entities/medida-cinco-minutos.entity';
import { ICceeMedidaQuinzeMinutosService } from '../../domain/services/ccee-medida-quinze-minutos.service';
import {
  ICceeMedidaCincoMinutosService,
  CCEE_MEDIDA_CINCO_MINUTOS_SERVICE,
} from '../../domain/services/ccee-medida-cinco-minutos.service';
import { CceeMedidaCincoMinutosParams } from '../../domain/types/ccee-medida-cinco-minutos.types';

@Injectable()
export class CceeMedidaQuinzeMinutosService
  implements ICceeMedidaQuinzeMinutosService
{
  constructor(
    @Inject(CCEE_MEDIDA_CINCO_MINUTOS_SERVICE)
    private readonly cceeMedidaCincoMinutosService: ICceeMedidaCincoMinutosService,
  ) {}

  private roundToNearestQuarter(date: Date): Date {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.floor(minutes / 15) * 15;
    const roundedDate = new Date(date);
    roundedDate.setMinutes(roundedMinutes, 0, 0);
    return roundedDate;
  }

  private aggregateMedidasCincoMinutos(
    medidas: MedidaCincoMinutos[],
  ): MedidaQuinzeMinutos[] {
    const groupedMedidas = new Map<string, MedidaCincoMinutos[]>();

    medidas.forEach((medida) => {
      const roundedDate = this.roundToNearestQuarter(medida.dataHora);
      const key = `${medida.codigoPontoMedicao}_${roundedDate.toISOString()}`;

      if (!groupedMedidas.has(key)) {
        groupedMedidas.set(key, []);
      }
      groupedMedidas.get(key)!.push(medida);
    });

    const medidasQuinzeMinutos: MedidaQuinzeMinutos[] = [];

    groupedMedidas.forEach((grupoMedidas) => {
      if (grupoMedidas.length === 0) return;

      const primeiraMedida = grupoMedidas[0];
      const roundedDate = this.roundToNearestQuarter(primeiraMedida.dataHora);

      const somaValores = grupoMedidas.reduce(
        (sum, medida) => sum + medida.valor,
        0,
      );
      const valorMedio = Number((somaValores / grupoMedidas.length).toFixed(2));

      const medidaQuinzeMinutos = MedidaQuinzeMinutos.create(
        primeiraMedida.codigoPontoMedicao,
        roundedDate,
        valorMedio,
        primeiraMedida.unidade,
      );

      medidasQuinzeMinutos.push(medidaQuinzeMinutos);
    });

    return medidasQuinzeMinutos.sort(
      (a, b) => a.dataHora.getTime() - b.dataHora.getTime(),
    );
  }

  async fetchMedidasQuinzeMinutos(
    params: CceeMedidaCincoMinutosParams,
  ): Promise<MedidaQuinzeMinutos[]> {
    try {
      const medidasCincoMinutos =
        await this.cceeMedidaCincoMinutosService.fetchMedidasCincoMinutos(
          params,
        );

      const medidasQuinzeMinutos =
        this.aggregateMedidasCincoMinutos(medidasCincoMinutos);

      return medidasQuinzeMinutos;
    } catch (error) {
      throw new Error(
        `Erro ao converter medidas de 5 minutos para 15 minutos: ${error.message}`,
      );
    }
  }
}
