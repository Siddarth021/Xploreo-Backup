import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  // Global prefix
  app.setGlobalPrefix('api');

  // CORS
  app.enableCors();

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(), new ResponseInterceptor());

  // Global guards
  app.useGlobalGuards(new AuthGuard(reflector), new RolesGuard(reflector));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Xploreo API')
    .setDescription('Complete backend API for the Xploreo travel platform')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-user-id', in: 'header' }, 'x-user-id')
    .addApiKey({ type: 'apiKey', name: 'x-user-role', in: 'header' }, 'x-user-role')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Xploreo API running on http://localhost:${port}/api`);
  console.log(`📚 Swagger docs at  http://localhost:${port}/api/docs`);
}
bootstrap();
