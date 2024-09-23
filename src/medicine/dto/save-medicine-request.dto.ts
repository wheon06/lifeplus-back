import { ApiProperty } from '@nestjs/swagger';

export class SaveMedicineRequestDto {
  @ApiProperty()
  breakfast: string;
  @ApiProperty()
  checkedBreakfast: boolean;
  @ApiProperty()
  lunch: string;
  @ApiProperty()
  checkedLunch: boolean;
  @ApiProperty()
  dinner: string;
  @ApiProperty()
  checkedDinner: boolean;
  @ApiProperty()
  date: string;
  @ApiProperty()
  userId: number;
}
