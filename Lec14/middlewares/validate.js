const { ZodError } = require("zod")


module.exports = (schema, property = 'body') => (req, res, next) => {
    try{
        const result = schema.parse(req[property] || {})
        req[property] = result

        next()
    }catch(e){
        if(e instanceof ZodError){
            const errors = e.issues.map(issue => ({
                filed: issue.path.join('.'),
                message: issue.message
            }))

            return res.status(400).json({
                message: "validation error",
                errors
            })
        }
    }
}