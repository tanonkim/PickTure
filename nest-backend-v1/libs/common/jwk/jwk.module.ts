import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG_SERVICE, JWK_OPTIONS } from './jwk.constants';
import { JwkModuleOptions } from './jwk.module.interfaces';

@Global()
@Module({
  imports: [
    JwtModule.register({
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
  exports: [
    JwtModule.register({
      signOptions: {
        algorithm: 'RS256',
      },
    }),
  ],
})
export class JwkModule extends createConfigurableDynamicRootModule<
  JwkModule,
  JwkModuleOptions
>(JWK_OPTIONS, {
  providers: [
    {
      provide: CONFIG_SERVICE,
      inject: [JWK_OPTIONS],
      useFactory: (options: JwkModuleOptions) => options.configService,
    },
  ],
  exports: [
    {
      provide: CONFIG_SERVICE,
      inject: [JWK_OPTIONS],
      useFactory: (options: JwkModuleOptions) => options.configService,
    },
  ],
}) {}
