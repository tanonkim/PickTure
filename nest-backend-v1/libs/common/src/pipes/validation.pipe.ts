import {
  Injectable,
  ValidationPipe as ValidationPipeBuiltin,
} from '@nestjs/common';

@Injectable()
export class MyValidationPipe extends ValidationPipeBuiltin {
  constructor() {
    super({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });
  }
}
