const { ZodError } = require("zod")


module.exports = (schema, property = 'body') => (req, res, next) => {
    try{
        const data = { ...(req[property] || {}) }

        if (property === 'body') {
            if (req.file) {
                data[req.file.fieldname] = req.file
            }
            if (Array.isArray(req.files)) {
                for (const file of req.files) {
                    (data[file.fieldname] ||= []).push(file)
                }
            } else if (req.files) {
                Object.assign(data, req.files)
            }
        }

        const result = schema.parse(data)
        req[property] = result

        next()
    }catch(e){
        if(e instanceof ZodError){
            const errors = e.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }))

            return res.status(400).json({
                message: "validation error",
                errors
            })
        }

        next(e)
    }
}