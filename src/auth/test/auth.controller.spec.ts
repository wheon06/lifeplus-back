import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { SignUpUserRequestDto } from '../../user/dto/signup-user-request.dto';

describe('AuthController', () => {
  let authController: AuthController;

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
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        JwtService,
        { provide: 'UserRepository', useValue: userRepository },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signin', () => {
    const reqDto: SignUpUserRequestDto = {
      username: 'username1',
      password: 'password1',
    };

    it('should be defined', () => {
      expect(authController.signin).toBeDefined();
    });

    it('should return user', async () => {
      jest.spyOn(authController, 'signin').mockResolvedValue({
        accessToken: 'x-access-token',
        refreshToken: 'x-refresh-token',
      });

      await expect(authController.signin(reqDto)).resolves.toEqual({
        accessToken: 'x-access-token',
        refreshToken: 'x-refresh-token',
      });
    });
  });
});
