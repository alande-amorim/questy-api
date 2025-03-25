import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@auth/guards/auth.guard';
import { InviteService } from '@projects/application/services/invite.service';
import { AcceptInviteDTO, CreateInviteDTO } from './dtos';

@ApiTags('Project Invites')
@Controller('projects/invites')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Convidar um usuário para um projeto' })
  async createInvite(@Req() req, @Body() data: CreateInviteDTO) {
    return this.inviteService.createInvite(req.user.id, data);
  }

  @Post('accept')
  @ApiOperation({ summary: 'Aceitar um convite para um projeto' })
  async acceptInvite(@Body() data: AcceptInviteDTO) {
    return this.inviteService.acceptInvite(data);
  }
}
