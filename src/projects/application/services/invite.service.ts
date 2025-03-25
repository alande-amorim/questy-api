import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateInviteDTO,
  AcceptInviteDTO,
} from '@projects/adapters/controllers/dtos';
import { randomBytes } from 'crypto';
import { ICognitoService } from '#domain/interfaces/cognito.interface';
import { IUsersRepo } from '#domain/interfaces/users-repo.interface';
import { ProjectUsersRepo } from '@projects/infra/repos/project-users.repo';

@Injectable()
export class InviteService {
  constructor(
    private readonly cognito: ICognitoService,
    private readonly usersRepo: IUsersRepo,
    private readonly projectUsersRepo: ProjectUsersRepo,
  ) {}

  async createInvite(inviterId: string, data: CreateInviteDTO) {
    const projectUser = await this.projectUsersRepo.findProjectUser(
      data.projectId,
      inviterId,
    );

    if (!projectUser || !projectUser.acceptedAt) {
      throw new NotFoundException('Project not found');
    }

    const token = randomBytes(32).toString('hex');

    // @TODO: check if the user already exists
    // @TODO: if the user exists, create the projectUser with the projectId and the userId
    // @TODO: if the user does not exist, create the user, create the projectUser with the projectId and the userId
    // @TODO: send the invite email to the user

    const user = await this.usersRepo.findOrCreate({
      email: data.email,
      name: data.email.split('@')[0], // temporary name
    });

    const invite = await this.projectUsersRepo.createProjectUser({
      projectId: data.projectId,
      userId: user.id,
      invitedBy: inviterId,
      invitedAt: new Date(),
      inviteToken: token,
    });

    // TODO: Send email with the invite link
    // The link should include the token and the invite ID

    return invite;
  }

  async acceptInvite(data: AcceptInviteDTO) {
    const invite = await this.projectUsersRepo.findInviteByToken(data.token);

    if (!invite) {
      throw new NotFoundException('Invalid or expired invite');
    }

    let user = await this.usersRepo.findById(invite.userId);

    if (!user.cognitoSub) {
      if (!data.password) {
        throw new Error('Please provide a password');
      }

      const cognitoUser = await this.cognito.createUser({
        name: user.name,
        email: user.email,
        password: data.password,
        ...data,
      });

      user = await this.usersRepo.upsertFromCognito({
        sub: cognitoUser.User.Username,
        email: user.email,
        name: data.name,
      });
    }

    await this.projectUsersRepo.updateProjectUser(
      invite.projectId,
      invite.userId,
      {
        userId: user.id,
        acceptedAt: new Date(),
        inviteToken: null,
      },
    );

    return user;
  }
}
