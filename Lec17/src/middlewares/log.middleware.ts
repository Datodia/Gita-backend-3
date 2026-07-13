import type { NextFunction, Request, Response } from "express";


export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers['user-agent'])
    next()
}