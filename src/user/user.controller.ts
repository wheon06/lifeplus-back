import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserRequestDto } from './dto/signup-user-request.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/signup')
  async signup(@Body() reqDto: SignUpUserRequestDto) {
    return this.userService.save(reqDto);
  }
}
