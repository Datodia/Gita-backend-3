const { default: z } = require("zod");


const signInDto = z.object({
    email: z.email("Wrong email provided"),
    password: z.string('password is required').min(6, 'password must be at least 6 char')
})

module.exports = {signInDto}