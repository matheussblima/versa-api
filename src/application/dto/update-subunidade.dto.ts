import { PartialType } from '@nestjs/swagger';
import { CreateSubUnidadeDto } from './create-subunidade.dto';

export class UpdateSubUnidadeDto extends PartialType(CreateSubUnidadeDto) {}
