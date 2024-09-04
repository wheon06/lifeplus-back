import { ApiProperty } from '@nestjs/swagger';

export class SaveUserDetailRequestDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  height: string;
  @ApiProperty()
  weight: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  mobile: string;
}
