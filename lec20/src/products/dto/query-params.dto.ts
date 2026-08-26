import { Transform } from "class-transformer"
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator"


export class QueryParamsDto {

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(1)
    page?: number = 1


    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Max(30)
    take?: number = 30


    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(1)
    priceFrom?: number


    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    priceTo?: number


    @IsOptional()
    @IsString()
    name?: string


    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    isStock?: number


    @IsOptional()
    @IsString()
    sort?: string

@IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    includeName?:number
}