import { UserService } from 'src/user/user.service';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { SaveUserDetailRequestDto } from './dto/save-user-detail-request.dto';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserDetail } from './entities/user-detail.entity';

@Controller('')
export class UserDetailController {
  constructor(
    private readonly userDetailService: UserDetailService,
    private readonly userService: UserService,
  ) {}

  @Post('user/detail')
  @ApiTags('유저 API')
  @ApiOperation({
    summary: '유저 세부정보 저장 API',
    description: 'id는 유저 아이디',
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [accessToken]' })
  @ApiCreatedResponse({ type: UserDetail })
  async save(@Body() reqDto: SaveUserDetailRequestDto) {
    const existUser = this.userService.findById(reqDto.id);
    if (!existUser) throw new NotFoundException('User not exists');
    return await this.userDetailService.save(reqDto);
  }

  @Get('user/detail/:id')
  @ApiTags('유저 API')
  @ApiOperation({
    summary: '유저 세부정보 조회 API',
    description: 'id는 유저 아이디',
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [accessToken]' })
  @ApiOkResponse({ type: UserDetail })
  async findDetail(@Param('id') id: number) {
    return await this.userDetailService.findById(id);
  }
}
