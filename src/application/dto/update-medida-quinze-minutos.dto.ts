import { PartialType } from '@nestjs/swagger';
import { CreateMedidaQuinzeMinutosDto } from './create-medida-quinze-minutos.dto';

export class UpdateMedidaQuinzeMinutosDto extends PartialType(
  CreateMedidaQuinzeMinutosDto,
) {}
