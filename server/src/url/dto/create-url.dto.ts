import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, IsUrl } from 'class-validator';
export class CreateUrlDto {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsUrl()
  longUrl: string;
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  alias?: string;
}
