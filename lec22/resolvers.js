import { posts, users } from "./data.js"


export const resolvers = {
    Post: {
        author:(parent) => {
           return users.find(u => u.id === parent.author)
        }
    },

    User: {
        posts: (parent) => {
            return posts.filter(p => p.author === parent.id)
        }
    },

    Query:{
        users: () => {
            return users
        },

        user: (_, args) => {
            return users.find(u => u.id === Number(args.id))
        },


        posts: () => {
            return posts
        },

        post: (_, args) => {
            return posts.find(u => u.id === Number(args.id))
        },
    },


    Mutation: {
        createUser(_, {createUserInput}){
            const lastId = users[users.length - 1]?.id || 0
            const newUser = {
                id: lastId+1,
                ...createUserInput
            }
            users.push(newUser)
            return newUser
        },

        deleteUser: (_, {id}) => {
            const index = users.findIndex(u => u.id === Number(id))
            const deleteUsers = users.splice(index, 1)

            return deleteUsers[0]
        },
 
        updateUser: (_, {updateUserInput, id}) => {
            const index = users.findIndex(u => u.id === Number(id))
            users[index] = {
                ...users[index],
                ...updateUserInput
            }

            return users[index]
        }
    }
}