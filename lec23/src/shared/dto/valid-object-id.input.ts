import { Field, ID, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty } from "class-validator";

@InputType()
export class ValidObjectId{
    @Field(() => ID)
    @IsNotEmpty()
    @IsMongoId()
    id!: string
    
}