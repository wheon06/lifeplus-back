import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SaveUserRequestDto } from './dto/save-user-request.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/signup')
  async signup(@Body() reqDto: SaveUserRequestDto) {
    return this.userService.save(reqDto);
  }
}
