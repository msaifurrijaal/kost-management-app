import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class ImageCreateDto {
  @ApiPropertyOptional({
    example: ['https://example.com/image1.jpg'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  create?: string[];
}

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

  @ApiPropertyOptional({ type: ImageCreateDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageCreateDto)
  images?: ImageCreateDto;
}

export class GetRoomsDto {
  @ApiPropertyOptional({
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    example: 'uuid-property-id',
  })
  @IsOptional()
  @IsString()
  propertyId?: string;

  @ApiPropertyOptional({
    example: 'uuid-status-id',
  })
  @IsOptional()
  @IsString()
  statusId?: string;

  @ApiPropertyOptional({
    example: 'Kost Menteng',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
    return value;
  })
  @IsBoolean()
  showDeleted?: boolean;

  @ApiPropertyOptional({
    example: 'updatedAt',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    example: 'desc',
  })
  @IsOptional()
  @IsString()
  sortOrder?: string;
}
