import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { SaveHealthRequestDto } from './dto/save-health-request.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @UseGuards(AuthGuard())
  @Post('save')
  async save(@Body() reqDto: SaveHealthRequestDto) {
    return await this.healthService.save(reqDto);
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  async findLast(@Param('id') userId: number) {
    return await this.healthService.findByOrderByCreatedAtDesc(userId);
  }
}
