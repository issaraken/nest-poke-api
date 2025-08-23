import { Global, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AppConfigService } from './services/config.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { JwtStrategy } from './strategies/jwt.strategy'

@Global()
@Module({
  imports: [PassportModule],
  providers: [AppConfigService, JwtAuthGuard, JwtStrategy],
  exports: [AppConfigService, JwtAuthGuard, JwtStrategy],
})
export class CommonModule {}
