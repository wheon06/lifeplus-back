import { ApiProperty } from '@nestjs/swagger';

export default class RefreshAccessTokenResponseDto {
  @ApiProperty()
  accessToken: string;
}
