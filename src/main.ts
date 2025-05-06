import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173'], // Specify your React app's origin
    credentials: true, // Allow credentials to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow methods needed for GraphQL
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
