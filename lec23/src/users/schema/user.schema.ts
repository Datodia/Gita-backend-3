import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User {

    @Prop({
        type: String,
        required: true
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'posts',
        default: []
    })
    posts!: mongoose.Schema.Types.ObjectId[]
}

export const userSchema = SchemaFactory.createForClass(User)