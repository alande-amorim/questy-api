import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthController } from './adapters/controllers/auth.controller';
import { PrismaModule } from '#infra/prisma/prisma.module';
import { UsersRepo } from '#infra/repos/users.repo';
import { CognitoModule } from '#infra/cognito/cognito.module';
import { ICognitoService } from '#domain/interfaces/cognito.interface';
import { IUsersRepo } from '#domain/interfaces/users-repo.interface';

@Global()
@Module({
  imports: [ConfigModule, PrismaModule, CognitoModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthService,
      inject: ['ICognitoService', 'IUsersRepo'],
      useFactory: (cognitoService: ICognitoService, userRepo: IUsersRepo) => {
        return new AuthService(cognitoService, userRepo);
      },
    },
    AuthGuard,
    UsersRepo,
  ],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
