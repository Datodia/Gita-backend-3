import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import { CreateAddressDto } from "./create-address.dto"
import { Type } from "class-transformer"

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


    @ValidateNested()
    @Type(() => CreateAddressDto)
    address?: CreateAddressDto
}
