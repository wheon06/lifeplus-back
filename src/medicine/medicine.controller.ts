import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { SaveMedicineRequestDto } from './dto/save-medicine-request.dto';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Medicine } from './entities/medicine.entity';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @ApiTags('약 정보 API')
  @ApiOperation({
    summary: '약 정보 저장 API',
  })
  @ApiCreatedResponse({ type: Medicine })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [accessToken]' })
  @UseGuards(AuthGuard())
  @Post('save')
  async save(@Body() reqDto: SaveMedicineRequestDto) {
    return await this.medicineService.save(reqDto);
  }

  @ApiTags('약 정보 API')
  @ApiOperation({
    summary: '약 체크 유무 업데이트 API',
  })
  @ApiOkResponse({ type: [Number] })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [accessToken]' })
  @ApiQuery({ name: 'index', required: true, type: String })
  @ApiQuery({ name: 'value', required: true, type: String })
  @ApiQuery({
    name: 'date',
    required: true,
    description: '형식 : 2024-01-01',
    type: String,
  })
  @UseGuards(AuthGuard())
  @Patch(':id')
  async updateIsChecked(@Param('id') userId: number, @Query() query: any) {
    return await this.medicineService.updateIsChecked(
      userId,
      query.index,
      query.value,
      query.date,
    );
  }

  @ApiTags('약 정보 API')
  @ApiOperation({
    summary: '약 정보 불러오기 API',
  })
  @ApiOkResponse({ type: Medicine })
  @ApiHeader({ name: 'Authorization', description: 'Bearer [accessToken]' })
  @ApiQuery({
    name: 'date',
    required: true,
    description: '형식 : 2024-01-01',
    type: String,
  })
  @UseGuards(AuthGuard())
  @Get(':id')
  async getMedicine(@Param('id') id: number, @Query() query: any) {
    return await this.medicineService.findByDate(id, query.date);
  }
}
