import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserWithoutPostsPayload {
    @Field(() => ID)
    _id!: string
    
    @Field(() => String)
    fullName!: string

    @Field(() => String)
    email!: string
}