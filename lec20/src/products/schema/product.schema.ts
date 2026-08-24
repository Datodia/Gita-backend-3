import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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

}


export const productSchema = SchemaFactory.createForClass(Product)