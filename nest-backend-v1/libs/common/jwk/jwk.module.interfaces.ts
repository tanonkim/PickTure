export interface ConfigService {
  jwtPublic: string;
  jwtIssuer: string;
  env: string;
  apiPassKey: string;
}

export interface JwkModuleOptions {
  configService: ConfigService;
}
