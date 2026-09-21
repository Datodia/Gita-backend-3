import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostPayload } from './payload/post.payload';
import { UseGuards } from '@nestjs/common';
import { HasUserId } from './guards/has-user-id.guard';
import { UserId } from 'src/users/decorators/user-id.decorator';
import { ParseObjectIdPipe } from 'src/shared/pipes/parse-object-id.pipe';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostPayload)
  @UseGuards(HasUserId)
  createPost(@UserId() userId, @Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput, userId);
  }

  @Query(() => [PostPayload])
  findAllPosts() {
    return this.postsService.findAll();
  }

  @Query(() => PostPayload)
  findOnePost(@Args('id', { type: () => ID }, ParseObjectIdPipe) id: string) {
    return this.postsService.findOne(id);
  }

  // @Mutation('updatePost')
  // update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postsService.update(updatePostInput.id, updatePostInput);
  // }

  @Mutation(() => PostPayload)
  removePost(@Args('id', ParseObjectIdPipe) id: string) {
    return this.postsService.remove(id);
  }
}
