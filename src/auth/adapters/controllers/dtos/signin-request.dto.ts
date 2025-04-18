import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '#domain/types/auth';

export class SigninRequestDTO implements Auth.SignInRequest {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'secret',
  })
  @IsString()
  password: string;
}
