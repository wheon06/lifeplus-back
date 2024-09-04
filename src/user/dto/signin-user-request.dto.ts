import { ApiProperty } from '@nestjs/swagger';

export class SignInUserRequestDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
