import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { SaveMedicineRequestDto } from './dto/save-medicine-request.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('save')
  async save(@Body() reqDto: SaveMedicineRequestDto) {
    return await this.medicineService.save(reqDto);
  }

  @Get(':id')
  async getMedicine(@Param('id') id: number, @Query() query: any) {
    return await this.medicineService.findByDate(id, query.date);
  }
}
