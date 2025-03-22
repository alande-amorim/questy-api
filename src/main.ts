import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infra/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Questy API')
    .setDescription('API documentation for Questy')
    .setVersion('1.0')
    .addTag('projects')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
