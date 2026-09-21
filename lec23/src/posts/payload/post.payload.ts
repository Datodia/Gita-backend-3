import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserPayLoad } from "src/users/payload/users.payload";
import { UserWithoutPostsPayload } from "./user-without-posts.payload";

@ObjectType()
export class PostPayload {

    @Field(() => ID)
    _id!: string

    @Field(() => String)
    title!: string

    @Field(() => String)
    desc!: string

    @Field(() => UserWithoutPostsPayload)
    author!: object
}