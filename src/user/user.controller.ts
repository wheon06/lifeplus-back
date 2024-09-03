import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserRequestDto } from './dto/signup-user-request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Post('auth/signup')
  async signup(@Body() reqDto: SignUpUserRequestDto) {
    return this.userService.save(reqDto);
  }
}
