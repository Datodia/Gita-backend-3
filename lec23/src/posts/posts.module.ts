import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './schema/post.schema';
import { userSchema } from 'src/users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'posts', schema: postSchema},
      {name: 'users', schema: userSchema},
    ])
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
