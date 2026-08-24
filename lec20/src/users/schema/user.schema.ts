import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
    _id: false
})
class Address {
    @Prop({
        type: String,
        required: true
    })
    street!: string;

    @Prop({
        type: String,
        required: true
    })
    city!: string;
}

const addressSchema = SchemaFactory.createForClass(Address)

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
        type: String,
        required: true,
        select: false
    })
    password!: string


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


    @Prop({
        type: addressSchema
    })
    address!: Address

}


export const userSchema = SchemaFactory.createForClass(User)