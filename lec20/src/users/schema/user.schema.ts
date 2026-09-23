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
        required: false,
        select: false
    })
    password?: string


    @Prop({
        type: Number,
        required: false
    })
    age?: number


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

    @Prop({
        type: Boolean,
        default: false
    })
    isVerified!: boolean

    @Prop({
        type: String,
    })
    OTPCode?: string

    @Prop({
        type: Number,
    })
    OTPCodeExpirationDate?: number

    @Prop({
        type: String,
        required: false
    })
    profilePic?: string
}


export const userSchema = SchemaFactory.createForClass(User)