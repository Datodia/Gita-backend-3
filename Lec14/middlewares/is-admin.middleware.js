

module.exports =(req, res, next) => {
    const role = req.headers['role']

    if (!role || role !== "ADMIN") {
        return res.status(403).json({message:'PERMITION_DENIED'})
    }

    next()
}