import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { isValidObjectId } from "mongoose";
import { Observable } from "rxjs";


export class HasUserId implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const {req} = ctx.getContext()

        const userId = req.headers['user-id']
        if(!userId || !isValidObjectId(userId)) throw new UnauthorizedException('User id is not provided')
        
        req.userId = userId
        
        return true
    }
}