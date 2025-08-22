import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateRegiaoDto {
  @ApiProperty({
    description: 'Sigla da região',
    example: 'SE',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  sigla: string;

  @ApiProperty({
    description: 'Nome da região',
    example: 'Sudeste',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nome: string;
}
