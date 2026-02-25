import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 'Kamar 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== undefined ? parseFloat(value) : value))
  width?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value !== undefined ? parseFloat(value) : value))
  length?: number;

  @ApiProperty({ example: 'uuid-property-id' })
  @IsUUID()
  propertyId: string;
}
