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

@Module({
  imports: [AppConfigModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, { provide: CUSTOM_LOGGER, useClass: CustomLogger }],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .exclude('/', '/health')
      .forRoutes('*');
  }
}
