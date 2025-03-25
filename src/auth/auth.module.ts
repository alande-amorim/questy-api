import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthController } from './adapters/controllers/auth.controller';
import { PrismaModule } from '../shared/infra/prisma/prisma.module';
import { UserRepo } from './infra/repos/user.repo';
import { CognitoService } from './services/cognito.service';

@Global()
@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, UserRepo, CognitoService],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
