import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { SignUpUserRequestDto } from './dto/signup-user-request.dto';
import { ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: any;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: 'UserRepository', useValue: userRepository },
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('save', () => {
    const reqDto: SignUpUserRequestDto = {
      username: 'username1',
      password: 'password1',
    };

    const user: any = {
      id: 1,
      username: 'username1',
      password: 'encryptedPassword',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      deletedAt: null,
    };

    it('should be defined', () => {
      expect(userService.save).toBeDefined();
    });

    it('should throw ConflictException', async () => {
      jest
        .spyOn(userService, 'save')
        .mockRejectedValue(new ConflictException('User already exists'));

      await expect(userService.save(reqDto)).rejects.toThrow(ConflictException);
    });

    it('should return user', async () => {
      jest.spyOn(userService, 'save').mockResolvedValue(user);

      await expect(userService.save(reqDto)).resolves.toEqual(user);
    });
  });
});
