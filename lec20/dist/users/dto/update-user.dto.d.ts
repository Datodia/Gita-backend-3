import { CreateUserDto } from './create-user.dto';
import { UpdateAddressDto } from './update-address.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateUserDto, "address">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    address?: UpdateAddressDto;
}
export {};
