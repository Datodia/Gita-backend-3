import { Transform } from 'class-transformer';
import {
  IsBase64,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @Transform(({value}) => Number(value))
  @IsNumber()
  price!: number;

  @IsOptional()
  photo!: string;

  @IsNotEmpty()
  @Transform(({value}) => Number(value))
  @IsNumber()
  stock!: number;

  @IsNotEmpty()
  @Transform(({value}) => Number(value))
  @IsNumber()
  rating!: number;

  @IsOptional()
  @IsString()
  role!: string;

  @IsOptional()
  @IsString()
  desc?: string;
}
