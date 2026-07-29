import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"


@Schema({
    timestamps: true
})
export class Expense {

    @Prop({
        type: String,
        required: true,
    })
    category!: string


    @Prop({
        type: Number,
        required: true
    })
    amount!:  number


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    })
    owner!: mongoose.Schema.Types.ObjectId

}


export const expenseSchema = SchemaFactory.createForClass(Expense)