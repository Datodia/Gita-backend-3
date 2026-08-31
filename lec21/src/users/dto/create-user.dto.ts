import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name!: string


    @IsNotEmpty()
    @IsEmail()
    email!: string


    @IsNotEmpty()
    @Transform(({value}) => Number(value))
    @IsNumber()
    age!: number
}
