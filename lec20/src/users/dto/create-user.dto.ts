import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsNumber()
    age!: number
}
