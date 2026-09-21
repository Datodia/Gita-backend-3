import { Field, ID, ObjectType } from "@nestjs/graphql"
import { PostPayload } from "src/posts/payload/post.payload"
import { PostsWithoutAuthorPayload } from "./posts-without-author.payload"


@ObjectType()
export class UserPayLoad {
    @Field(() => ID)
    _id!: string

    @Field(() => String)
    fullName!: string

    @Field(() => String)
    email!: string


    @Field(() => [PostsWithoutAuthorPayload])
    posts!: string
}