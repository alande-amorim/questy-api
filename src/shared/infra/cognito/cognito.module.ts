import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CognitoService } from './cognito.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ICognitoService',
      useClass: CognitoService,
    },
  ],
  exports: ['ICognitoService'],
})
export class CognitoModule {}
