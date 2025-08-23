import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AppConfigService } from '../services/config.service'
import { JwtPayloadModel } from '../dto/auth.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appConfig: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwtSecret,
    })
  }

  validate(payload: JwtPayloadModel) {
    if (!payload.sub || !payload.username) {
      throw new UnauthorizedException('Invalid token payload')
    }

    return {
      userId: payload.sub,
      username: payload.username,
    }
  }
}
