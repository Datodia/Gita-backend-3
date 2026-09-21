import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./schema/user.schema";
import { postSchema } from "src/posts/schema/post.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'users', schema: userSchema},
            {name: 'posts', schema: postSchema},
        ])
    ],
    providers: [UsersResolver, UsersService]
})
export class UsersModule{} 