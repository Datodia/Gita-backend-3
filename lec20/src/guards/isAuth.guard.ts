import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class IsAuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const token = this.getTokenFromHeaders(req.headers)

        if(!token){
            return false
        }

        try {
            const payload = this.jwtService.verify(token, {secret: process.env.JWT_SECRET})

            req.userId = payload.userId
        } catch (error) {
            throw new UnauthorizedException('Permition denied')
        }
        return true
    }

    getTokenFromHeaders(headers){
        const authorization = headers['authorization']
        if(!authorization) return null

        const [type, token] = authorization.split(' ')
        if(!token) return null

        return type === 'Bearer' ? token : null
    }
}