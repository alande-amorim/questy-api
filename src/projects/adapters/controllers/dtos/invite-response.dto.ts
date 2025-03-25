import { ApiProperty } from '@nestjs/swagger';
import { ProjectUser } from '#domain/types';

export class InviteResponseDTO implements ProjectUser.Entity {
  @ApiProperty({
    description: 'ID do projeto',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  projectId: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  userId: string;

  @ApiProperty({
    description: 'Token do convite',
    example: 'abc123def456',
    required: false,
  })
  inviteToken?: string;

  @ApiProperty({
    description: 'ID do usuário que enviou o convite',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  invitedBy?: string;

  @ApiProperty({
    description: 'Data em que o convite foi enviado',
    example: '2024-03-25T10:00:00Z',
    required: false,
  })
  invitedAt?: Date;

  @ApiProperty({
    description: 'Data em que o convite foi aceito',
    example: '2024-03-25T10:00:00Z',
    required: false,
  })
  acceptedAt?: Date;

  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-03-25T10:00:00Z',
  })
  createdAt: Date;
}
