import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserRequestDto } from './dto/signup-user-request.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth/signup')
  @ApiTags('유저 API')
  @ApiOperation({ summary: '유저 회원가입 API' })
  @ApiCreatedResponse({ type: User })
  @ApiConflictResponse({ description: 'User already exists' })
  async signup(@Body() reqDto: SignUpUserRequestDto) {
    return await this.userService.save(reqDto);
  }

  @Get('auth/signup/:username')
  @ApiTags('유저 API')
  @ApiOperation({ summary: '유저 중복확인 API' })
  @ApiOkResponse()
  @ApiConflictResponse({ description: 'User already exists' })
  async checkExistUser(@Param('username') username: string) {
    return await this.userService.checkExistUser(username);
  }
}
