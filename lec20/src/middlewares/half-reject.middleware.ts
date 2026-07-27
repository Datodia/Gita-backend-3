import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";


export class HalfRejectMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        if(Math.random() > 0.5){
            throw new BadRequestException('Rejected')
        }

        next()
    }
}