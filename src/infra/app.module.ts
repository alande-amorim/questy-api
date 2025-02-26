import { Module } from '@nestjs/common';
import { AppController } from '../adapters/controllers/app.controller';
import { AppService } from '../application/usecases/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
