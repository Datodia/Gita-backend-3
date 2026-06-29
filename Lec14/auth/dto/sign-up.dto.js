const { default: z } = require("zod");


const signUpDto = z.object({
    name: z.string().min(2, 'Name must be at least 2 char'),
    age: z.number('aq rasac dawert'),
    isSmoker: z.optional().default(false),
    email: z.email(),
    password: z.string().min(6, 'password must be at least 6 char')
})

module.exports = {signUpDto}