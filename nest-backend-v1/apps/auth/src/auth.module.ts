import {
  CustomLogger,
  RequestLoggerMiddleware,
} from '@app/common/logger.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CUSTOM_LOGGER } from '@app/common/constant';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from '@app/common/exceptionFilter.service';
import { MyValidationPipe } from '@app/common/pipes/validation.pipe';

@Module({
  imports: [AppConfigModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: CUSTOM_LOGGER, useClass: CustomLogger },
    { provide: APP_PIPE, useClass: MyValidationPipe },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .exclude('/', '/health')
      .forRoutes('*');
  }
}
