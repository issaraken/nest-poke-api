import { Transform } from 'class-transformer'
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator'

export class UserAuthDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(6, { message: 'Username must be at least 6 characters' })
  @MaxLength(30, { message: 'Username must not exceed 30 characters' })
  @Transform(({ value }: { value: string }) => value?.trim())
  username: string

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(60, { message: 'Password must not exceed 60 characters' })
  @Transform(({ value }: { value: string }) => value?.trim())
  password: string
}

export interface UserInfo {
  id: string
  username: string
  passwordHash: string
  createdAt: string
}

export interface PublicUserInfo {
  id: string
  username: string
  createdAt: string
}

export interface UserListsResponse {
  total: number
  data: PublicUserInfo[]
}

export interface LoginResponseModel {
  username: string
  accessToken: string
  expiresIn: string
}
