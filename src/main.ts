import { NestFactory } from '@nestjs/core';
import { AppModule } from './shared/infra/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that don't have decorators
      transform: true, // Transform payloads to DTO instances
      forbidNonWhitelisted: true, // Throw errors if non-whitelisted properties are present
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Questy API')
    .setDescription('API documentation for Questy')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token (Bearer <token>)',
        in: 'header',
      },
      'access-token',
    )
    .addTag('auth')
    .addTag('projects')
    .addTag('Project Invites')
    .addTag('tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  SwaggerModule.setup('docs-json', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(process.env.APP_PORT || 8080);
}
bootstrap();
