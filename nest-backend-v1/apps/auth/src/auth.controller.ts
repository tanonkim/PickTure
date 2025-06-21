import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@app/common/decorators/public.decorator';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Health check
  @Get('/health')
  healthCheck() {
    return 'PickTure Auth Service!';
  }

  @Public()
  @Get()
  K8SHealthCheckRouter() {
    return 'PickTure auth API!';
  }

  @Public()
  @Get('/.well-known/jwks.json')
  getJWKjson() {
    return this.authService.genJWK();
  }
}
