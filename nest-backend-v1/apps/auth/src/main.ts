import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .addBearerAuth({ type: 'http' }, 'Refresh')
    .addBasicAuth()
    .setTitle('PicTure API')
    .setDescription('PicTure API dpayescription')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  console.log(`port ` + configService.get('PORT'));
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
