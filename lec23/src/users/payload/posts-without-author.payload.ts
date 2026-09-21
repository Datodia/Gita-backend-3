import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class PostsWithoutAuthorPayload {
    @Field(() => ID)
    _id!: string

    @Field(() => String)
    title!: string

    @Field(() => String)
    desc!: string
    
}