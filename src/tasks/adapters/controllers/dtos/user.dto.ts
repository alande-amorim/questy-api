import { User } from '#domain/types';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO implements User.Entity {
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User created at',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User updated at',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
