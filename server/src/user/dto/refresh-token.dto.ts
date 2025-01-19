import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    description: 'Refresh Token',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
