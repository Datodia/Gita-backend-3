import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema({
    timestamps: true
})
export class User  {
    @Prop({
        type: String,
        required: true,
        lowercase: true
    })
    fullName!: string


    @Prop({
        type: String,
        required: true,
        unique: true,
        lowercase: true
    })
    email!: string


    @Prop({
        type: Number,
        required: true
    })
    age!: number


    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'expense',
        default: []
    })
    expenses!: mongoose.Schema.Types.ObjectId[]
}


export const userSchema = SchemaFactory.createForClass(User)