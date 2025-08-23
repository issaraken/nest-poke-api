import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AppConfigService } from './services/config.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtStrategy } from './strategies/jwt.strategy'
import { CacheModule } from '@nestjs/cache-manager'

@Global()
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        secret: config.jwtSecret,
        signOptions: { expiresIn: config.jwtExpiresIn },
      }),
    }),
    CacheModule.register({
      ttl: 600, // 10 minutes in seconds
      max: 100, // maximum number of items in cache
    }),
  ],
  providers: [AppConfigService, JwtAuthGuard, JwtStrategy],
  exports: [
    AppConfigService,
    JwtAuthGuard,
    JwtStrategy,
    JwtModule,
    CacheModule,
  ],
})
export class CommonModule {}
