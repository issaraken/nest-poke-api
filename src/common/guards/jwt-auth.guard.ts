import { JwtPayloadModel } from '@common/dto/auth.dto'
import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isValid = super.canActivate(context)
    if (!isValid) {
      throw new UnauthorizedException('Invalid or missing token')
    }

    const request = context
      .switchToHttp()
      .getRequest<{ headers: { authorization?: string } }>()

    const authHeader = request.headers.authorization
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7)

      try {
        const payload: JwtPayloadModel = this.jwtService.verify(token)

        const currentTime = Math.floor(Date.now() / 1000)
        const tokenExpiry = payload.exp
        if (tokenExpiry && currentTime > tokenExpiry) {
          console.error('Token has expired!')
          throw new UnauthorizedException('Token has expired')
        }
      } catch (error) {
        console.error('Invalid token format:', error)
        throw new UnauthorizedException('Invalid token')
      }
    }

    return super.canActivate(context)
  }

  handleRequest(err: unknown, user: unknown): any {
    if (err) {
      throw err instanceof Error
        ? err
        : new UnauthorizedException('Authentication error')
    }
    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }
    return user
  }
}
