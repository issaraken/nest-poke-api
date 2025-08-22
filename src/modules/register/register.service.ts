import { ConflictException, Injectable } from '@nestjs/common'
import { CreateRegisterDto, UserInfo } from './register.dto'
import * as bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'

@Injectable()
export class RegisterService {
  private readonly usersByUsername = new Map<string, UserInfo>()

  async createUser(dto: CreateRegisterDto) {
    const usernameKey = dto.username.toLowerCase()

    // ตรวจซ้ำ
    if (this.usersByUsername.has(usernameKey)) {
      throw new ConflictException('Username already taken')
    }

    // Hash รหัสผ่าน
    const passwordHash = await bcrypt.hash(dto.password, 10)

    const user: UserInfo = {
      id: randomUUID(),
      username: dto.username,
      passwordHash,
      createdAt: new Date().toISOString(),
    }

    this.usersByUsername.set(usernameKey, user)

    // คืนข้อมูลไม่รวม passwordHash
    return {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      results: this.usersByUsername,
    }
  }

  getUserLists() {
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
}
