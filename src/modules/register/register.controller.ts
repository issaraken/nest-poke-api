import { Body, Controller, Get, Post } from '@nestjs/common'
import { RegisterService } from './register.service'
import { CreateRegisterDto } from './register.dto'

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async createUser(@Body() dto: CreateRegisterDto) {
    return this.registerService.createUser(dto)
  }

  @Get()
  getUserList() {
    return this.registerService.getUserLists()
  }
}
