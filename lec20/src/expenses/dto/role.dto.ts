import { Expose } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RoleDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(['admin', 'editor'])
    role!: string
}