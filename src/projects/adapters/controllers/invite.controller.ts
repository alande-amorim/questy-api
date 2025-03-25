import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@auth/guards/auth.guard';
import { InviteService } from '@projects/application/services/invite.service';
import {
  AcceptInviteDTO,
  CreateInviteDTO,
  InviteResponseDTO,
  UserResponseDTO,
} from './dtos';

@ApiTags('Project Invites')
@Controller('projects/invites')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Convidar um usuário para um projeto',
    description:
      'Cria um convite para um usuário participar de um projeto. O convite será enviado por email.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Convite criado com sucesso',
    type: InviteResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Projeto não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado',
  })
  async createInvite(@Req() req, @Body() data: CreateInviteDTO) {
    return this.inviteService.createInvite(req.user.id, data);
  }

  @Post('accept')
  @ApiOperation({
    summary: 'Aceitar um convite para um projeto',
    description:
      'Aceita um convite para participar de um projeto. Se o usuário não existir, ele será criado.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Convite aceito com sucesso',
    type: UserResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Convite inválido ou expirado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  async acceptInvite(@Body() data: AcceptInviteDTO) {
    return this.inviteService.acceptInvite(data);
  }
}
