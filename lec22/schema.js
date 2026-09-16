
export const typeDefs = `#graphql

    type User {
        id: ID,
        fullName: String,
        age: Int,
        isSmoker: Boolean,
        posts: [Post]
    }

    type Post {
        id: ID,
        title: String,
        desc: String,
        author: User
    }


    type Query {
        users: [User]
        user(id: ID!): User

        posts: [Post]
        post(id: ID!): Post
    }

    input CreateUserInput {
        fullName: String!,
        age: Int!,
        isSmoker: Boolean!
    }

    input UpdateUserInput {
        fullName: String,
        age: Int,
        isSmoker: Boolean
    }

    type Mutation {
        createUser(createUserInput: CreateUserInput!): User,
        deleteUser(id: ID!): User,
        updateUser(updateUserInput: UpdateUserInput, id: ID!): User
    }

`