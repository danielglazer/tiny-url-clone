import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateUrlDto {
  @ApiProperty({ type: String })
  userId: string;
  @ApiProperty({ type: String })
  longUrl: string;
  @ApiPropertyOptional({ type: String })
  alias?: string;
}
