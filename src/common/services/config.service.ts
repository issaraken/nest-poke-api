import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwtSecret(): string {
    return (
      this.configService.get<string>(
        'JWT_SECRET',
        'your-secret-key-change-in-production',
      ) ?? 'your-secret-key-change-in-production'
    )
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRES_IN', '24h') ?? '24h'
  }
}
