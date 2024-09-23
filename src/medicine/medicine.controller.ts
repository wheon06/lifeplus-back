import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { SaveMedicineRequestDto } from './dto/save-medicine-request.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('save')
  async save(@Body() reqDto: SaveMedicineRequestDto) {
    return await this.medicineService.save(reqDto);
  }

  @Patch(':userId')
  async updateIsChecked(@Param('userId') userId: number, @Query() query: any) {
    return await this.medicineService.updateIsChecked(
      userId,
      query.index,
      query.value,
      query.date,
    );
  }

  @Get(':id')
  async getMedicine(@Param('id') id: number, @Query() query: any) {
    return await this.medicineService.findByDate(id, query.date);
  }
}
