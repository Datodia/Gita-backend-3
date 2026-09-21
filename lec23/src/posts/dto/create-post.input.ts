import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreatePostInput {
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    title!: string


    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    desc!: string
}
