import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({ example: 'Apartemen Menteng' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Jl. Menteng No. 10',
  })
  @IsString()
  address: string;

  @ApiPropertyOptional({
    example: 'Apartemen premium dekat pusat kota',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'uuid-city-id' })
  @IsUUID()
  cityId: string;

  @ApiProperty({ example: 'uuid-user-id' })
  @IsUUID()
  ownerId: string;
}
