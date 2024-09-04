import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { SignInUserRequestDto } from 'src/user/dto/signin-user-request.dto';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(
    reqDto: SignInUserRequestDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existUser = await this.userService.findByUsername(reqDto.username);
    if (!existUser) throw new UnauthorizedException('Invalid ID or password');

    const isValidate = bcrypt.compareSync(reqDto.password, existUser.password);
    if (!isValidate) throw new UnauthorizedException('Invalid ID or password');

    const payload: Payload = { id: existUser.id, username: existUser.username };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
      }),
    };
  }

  async refreshAccessToken(user: any) {
    const payload: Payload = { id: user.id, username: user.username };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      }),
    };
  }

  async verifyRefreshToken(token: string) {
    try {
      const secret = this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
      const payload = this.jwtService.verify(token, {
        secret: secret,
      });
      return await this.userService.findById(payload.id);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
