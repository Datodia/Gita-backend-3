import { Field, InputType } from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

@InputType()
export class CreateUserInput {

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    fullName!: string

    @Field(() => String)
    @IsNotEmpty()
    @IsEmail()
    email!: string
}