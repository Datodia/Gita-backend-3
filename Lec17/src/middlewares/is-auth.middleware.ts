import { NextFunction, Response } from "express";
import { RequestWUserId } from "../types/req-w-userId";


export const isAuth = async (req: RequestWUserId, res: Response, next: NextFunction) => {
    const payload = {
        userId: "123"
    }


    req.userid = payload.userId
}