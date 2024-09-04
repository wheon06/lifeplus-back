import { ApiProperty } from '@nestjs/swagger';

export class SaveHealthRequestDto {
  @ApiProperty()
  heartRate: number;
  @ApiProperty()
  temperature: number;
  @ApiProperty()
  oxygenSaturation: number;
  @ApiProperty()
  stress: number;
  @ApiProperty()
  userId: number;
}
