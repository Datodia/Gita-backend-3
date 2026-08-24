import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UpdateAddressDto } from './update-address.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['address'])) {

    @ValidateNested()
    @Type(() => UpdateAddressDto)
    address?: UpdateAddressDto
}
