import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserPayLoad } from "./payload/users.payload";
import { CreateUserInput } from "./dto/create-user.input";
import { ParseObjectIdPipe } from "src/shared/pipes/parse-object-id.pipe";


@Resolver()
export class UsersResolver{
    constructor(
        private usersService: UsersService
    ){}

    @Query(() => [UserPayLoad])
    findAllUsers(){
        return this.usersService.getAll()
    }

    @Mutation(() => UserPayLoad)
    createUser(@Args('CreateUserInput') createUserInput: CreateUserInput){
        return this.usersService.createUser(createUserInput)
    }

    @Mutation(() => UserPayLoad)
    removeUser(@Args('id', ParseObjectIdPipe) id: string){
        return this.usersService.removeUser(id)
    }
}