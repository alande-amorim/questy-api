import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AcceptInviteDTO {
  @ApiProperty({
    description: 'Token do convite',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'secret',
  })
  @IsString()
  password?: string;
}
