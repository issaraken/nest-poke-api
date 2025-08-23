import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import type {
  LoginResponseModel,
  PublicUserInfo,
  UserAuthDto,
  UserListsResponse,
} from './auth.dto'
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard'

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async createUser(@Body() dto: UserAuthDto): Promise<PublicUserInfo> {
    return this.authService.createUser(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  getUserList(): UserListsResponse {
    return this.authService.getUserLists()
  }

  @Post('login')
  async login(@Body() dto: UserAuthDto): Promise<LoginResponseModel> {
    return this.authService.login(dto)
  }
}
