import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class SafeGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const req: Request = context.switchToHttp().getRequest()
        const key = req.headers['key']

        if(!key || key !== 'secret'){
            return false
        }

        return true
    }
}