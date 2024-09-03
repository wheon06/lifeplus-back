import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserRequestDto } from '../user/dto/signin-user-request.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/signin')
  async signin(@Body() reqDto: SignInUserRequestDto) {
    return this.authService.validate(reqDto);
  }
}
