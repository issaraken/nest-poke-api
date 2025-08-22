import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator'

export class CreateRegisterDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(30, { message: 'Username must not exceed 30 characters' })
  @Matches(/^[a-zA-Z0-9._-]+$/, {
    message: 'Username allows only a-z A-Z 0-9 . _ -',
  })
  username!: string

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(60, { message: 'Password must not exceed 60 characters' })
  password!: string
}

export interface UserInfo {
  id: string
  username: string
  passwordHash: string
  createdAt: string
}
