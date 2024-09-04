import { ApiProperty } from '@nestjs/swagger';

export class SignUpUserRequestDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
