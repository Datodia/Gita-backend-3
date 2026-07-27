
// ADMIN - ALL permition
// EDITOR - ALL permition except DELTE
// VIEWER - only read premiiton

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class Viewer implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        const role = req.headers['role']
        if(role === 'viewer' || role === 'editor' || role === 'admin'){
            return true
        }

        return false
    }
}


@Injectable()
export class Editor implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        const role = req.headers['role']
        if(role === 'editor' || role === 'admin'){
            return true
        }

        return false
    }
}



@Injectable()
export class Admin implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        const role = req.headers['role']
        if(role === 'admin'){
            return true
        }

        return false
    }
}


@Injectable()
export class AccessGuard implements CanActivate{
    private roles: string[]
    constructor(...args){
        this.roles = args
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const role = req.headers['role']

        if(!this.roles.includes(role)){
            return false
        }

        return true
    }
}