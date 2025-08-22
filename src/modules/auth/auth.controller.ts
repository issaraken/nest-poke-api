import { Body, Controller, Get, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserAuthDto } from './auth.dto'

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async createUser(@Body() dto: UserAuthDto) {
    return this.authService.createUser(dto)
  }

  @Get('/users')
  getUserList() {
    return this.authService.getUserLists()
  }

  @Get('/login')
  signin() {
    return {
      msg: 'Login endpoint not implemented yet',
    }
  }
}
