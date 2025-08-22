import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import {
  PublicUserInfo,
  UserAuthDto,
  UserInfo,
  UserListsResponse,
} from './auth.dto'

@Injectable()
export class AuthService {
  private readonly usersByUsername = new Map<string, UserInfo>()

  async createUser(dto: UserAuthDto): Promise<PublicUserInfo> {
    const usernameKey = dto.username.toLowerCase()

    if (this.usersByUsername.has(usernameKey)) {
      throw new ConflictException('Username already taken')
    }

    const passwordHash = await bcrypt.hash(dto.password, 10)
    const user: UserInfo = {
      id: randomUUID(),
      username: dto.username,
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
    }))

    return {
      total: users.length,
      data: users,
    }
  }

  findByUsername(username: string): UserInfo | null {
    return this.usersByUsername.get(username.toLowerCase()) || null
  }

  async verifyPassword(username: string, password: string): Promise<boolean> {
    const user = this.findByUsername(username)
    if (!user) return false
    return bcrypt.compare(password, user.passwordHash)
  }
}
