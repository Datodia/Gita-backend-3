import { IsNotEmpty, IsString } from "class-validator";


export class CreateAddressDto {

    @IsNotEmpty()
    @IsString()
    street!: string


    @IsNotEmpty()
    @IsString()
    city!: string
}