import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { SaveHealthRequestDto } from './dto/save-health-request.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Health } from './entities/health.entity';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiTags('건강정보 API')
  @ApiOperation({
    summary: '건강정보 저장 API',
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [accessToken]' })
  @ApiCreatedResponse({ type: Health })
  @UseGuards(AuthGuard())
  @Post('save')
  async save(@Body() reqDto: SaveHealthRequestDto) {
    return await this.healthService.save(reqDto);
  }

  @ApiTags('건강정보 API')
  @ApiOperation({
    summary: '건강정보 조회 API',
    description: 'id는 유저 아이디',
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [accessToken]' })
  @ApiOkResponse({ type: Health })
  @UseGuards(AuthGuard())
  @Get(':id')
  async findLast(@Param('id') userId: number) {
    return await this.healthService.findByOrderByCreatedAtDesc(userId);
  }
}
