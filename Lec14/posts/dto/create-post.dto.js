const { default: z } = require("zod");


const createPostDto = z.object({
    title: z.string("title is required"),
    desc: z.string('desc is required')
})

module.exports = {createPostDto}