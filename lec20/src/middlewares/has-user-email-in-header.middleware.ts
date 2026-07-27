import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export class HasUserEmailInHeaders implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const email = req.headers['email']
        if(!email || !email.toString().trim() || !email.includes('@')){
            throw new BadRequestException('Email is not provided')
        }

        req['email'] = email

        next()
    }
}