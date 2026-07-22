import {IsIn, IsNotEmpty, IsNumber, IsString, Min} from 'class-validator'


export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(['shopping', 'food', 'sport', 'technic', 'travel'])
    category!: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price!: number
}