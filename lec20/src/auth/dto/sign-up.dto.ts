import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({example: "Giorgi Giorgadze", type: String, required: true})
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @ApiProperty({example: "Giorgi@gmail.com", type: String, required: true})
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({example: 22, type: Number, required: true})
  @IsNotEmpty()
  @IsNumber()
  age!: number;


  @ApiProperty({example: "Test@123", type: String, required: true})
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password!: string;
}
