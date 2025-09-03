import { PartialType } from '@nestjs/swagger';
import { CreatePldDto } from './create-pld.dto';

export class UpdatePldDto extends PartialType(CreatePldDto) {}
