import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { SignInUserRequestDto } from 'src/user/dto/signin-user-request.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  let userRepository: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
          },
        }),
        JwtModule.register({
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
          },
        }),
      ],
      providers: [
        AuthService,
        UserService,
        JwtService,
        { provide: 'UserRepository', useValue: userRepository },
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('validate', () => {
    const reqDto: SignInUserRequestDto = {
      username: 'username1',
      password: 'password1',
    };

    it('should be defined', () => {
      expect(authService.validate).toBeDefined();
    });

    it('should throw UnauthorizedException', async () => {
      jest
        .spyOn(authService, 'validate')
        .mockRejectedValue(new UnauthorizedException('Invalid ID or password'));

      await expect(authService.validate(reqDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return accessToken and refreshToken', async () => {
      jest.spyOn(authService, 'validate').mockResolvedValue({
        accessToken: 'x-access-token',
        refreshToken: 'x-refresh-token',
      });

      await expect(authService.validate(reqDto)).resolves.toEqual({
        accessToken: 'x-access-token',
        refreshToken: 'x-refresh-token',
      });
    });
  });
});
