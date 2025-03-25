import { Global, Module } from '@nestjs/common';
import { UsersRepo } from './users.repo';

@Global()
@Module({
  providers: [
    {
      provide: 'IUsersRepo',
      useClass: UsersRepo,
    },
  ],
  exports: ['IUsersRepo'],
})
export class ReposModule {}
