import { CreateAddressDto } from "./create-address.dto";
export declare class CreateUserDto {
    fullName: string;
    email: string;
    age: number;
    address?: CreateAddressDto;
}
