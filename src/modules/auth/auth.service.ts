import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import {
  LoginResponseModel,
  PublicUserInfo,
  UserAuthDto,
  UserInfo,
  UserListsResponse,
} from './auth.dto'
import { JwtService } from '@nestjs/jwt'
import { AppConfigService } from '@common/services/config.service'

@Injectable()
export class AuthService {
  private readonly usersByUsername = new Map<string, UserInfo>()

  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async createUser(data: UserAuthDto): Promise<PublicUserInfo> {
    const usernameKey = data.username

    if (this.usersByUsername.has(usernameKey)) {
      throw new ConflictException('Username already taken')
    }

    const passwordHash = await bcrypt.hash(data.password, 10)
    const user: UserInfo = {
      id: randomUUID(),
      username: data.username,
      passwordHash,
      createdAt: new Date().toISOString(),
    }

    this.usersByUsername.set(usernameKey, user)

    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    }
  }

  getUserLists(): UserListsResponse {
    const users = Array.from(this.usersByUsername.values()).map((user) => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      password: user.passwordHash,
    }))

    return {
      total: users.length,
      data: users,
    }
  }

  findByUsername(username: string): UserInfo | null {
    return this.usersByUsername.get(username) || null
  }

  async login(dto: UserAuthDto): Promise<LoginResponseModel> {
    const user = this.findByUsername(dto.username)

    if (!user) {
      throw new UnauthorizedException('Invalid username or password')
    }

    const isPasswordValid = await this.verifyPassword(
      dto.username,
      dto.password,
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password')
    }

    const payload = {
      sub: user.id,
      username: user.username,
      iat: Math.floor(Date.now() / 1000),
    }

    const accessToken = this.jwtService.sign(payload)

    return {
      username: user.username,
      accessToken,
      expiresIn: this.appConfigService.jwtExpiresIn,
    }
  }

  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = this.findByUsername(username)
    if (!user) return false
    return bcrypt.compare(password, user.passwordHash)
  }
}
