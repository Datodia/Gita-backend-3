import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/common/enums/role.enum";


@Schema()
export class Product {

    @Prop({
        type: String,
        required: true
    })
    name!: string


    @Prop({
        type: Number,
        required: true
    })
    price!: number


    @Prop({
        type: String,
        required: true
    })
    photoUrl!: string


    @Prop({
        type: Number,
        required: true,
        index: true
    })
    stock!: number


    @Prop({
        type: Number,
        required: true
    })
    rating!: number


    @Prop({
        enum: Role,
        required: true,
        default: Role.USER
    })
    role!: string


    @Prop({
        type: String,
        required: false
    })
    desc?: string 
}


export const productSchema = SchemaFactory.createForClass(Product)