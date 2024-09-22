import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserRequestDto } from '../user/dto/signin-user-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RefreshTokenGuard } from './security/refresh-token.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInUserResponseDto } from 'src/user/dto/signin-user-response.dto';
import { User } from 'src/user/entities/user.entity';
import RefreshAccessTokenResponseDto from 'src/auth/dto/refresh-access-token-response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/signin')
  @ApiTags('유저 API')
  @ApiOperation({ summary: '유저 로그인 API' })
  @ApiCreatedResponse({ type: SignInUserResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid ID or password' })
  async signin(@Body() reqDto: SignInUserRequestDto) {
    return this.authService.validate(reqDto);
  }

  @ApiTags('유저 API')
  @ApiOperation({ summary: '유저 정보 API' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [accessToken]' })
  @ApiOkResponse({ type: User })
  @ApiUnauthorizedResponse({ description: 'Invalid token' })
  @UseGuards(AuthGuard())
  @Get('authenticate')
  async authenticate(@Req() req: Request): Promise<any> {
    return req.user;
  }

  @ApiTags('토큰 API')
  @ApiOperation({
    summary: '엑세스 토큰 재발급 API',
    description: '엑세스 토큰 만료시 재발급',
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [refreshToken]' })
  @ApiOkResponse({ type: RefreshAccessTokenResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  @UseGuards(RefreshTokenGuard)
  @Get('refreshAccessToken')
  async refreshAccessToken(@Req() req: Request): Promise<any> {
    return this.authService.refreshAccessToken(req.user);
  }
}
