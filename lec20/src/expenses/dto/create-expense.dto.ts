import {IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString, Min} from 'class-validator'
import mongoose from 'mongoose'


export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(['shopping', 'food', 'sport', 'technic', 'travel'])
    category!: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount!: number


    @IsMongoId()
    owner!: mongoose.Schema.Types.ObjectId
}