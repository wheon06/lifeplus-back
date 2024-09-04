import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserRequestDto } from '../user/dto/signin-user-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RefreshTokenGuard } from './security/refresh-token.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/signin')
  async signin(@Body() reqDto: SignInUserRequestDto) {
    return this.authService.validate(reqDto);
  }

  @UseGuards(AuthGuard())
  @Get('authenticate')
  async authenticate(@Req() req: Request): Promise<any> {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refreshAccessToken')
  async refreshAccessToken(@Req() req: Request): Promise<any> {
    return this.authService.refreshAccessToken(req.user);
  }
}
