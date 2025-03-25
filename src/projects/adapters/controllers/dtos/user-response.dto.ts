import { ApiProperty } from '@nestjs/swagger';
import { User } from '#domain/types';

export class UserResponseDTO implements User.Entity {
  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'ID do usuário no Cognito',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  cognitoSub?: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2024-03-25T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do usuário',
    example: '2024-03-25T10:00:00Z',
  })
  updatedAt: Date;
}
