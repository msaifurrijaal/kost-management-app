import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class ImageItemUpdateDto {
  @ApiProperty({ example: 'uuid-image-id' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'https://example.com/image1.jpg' })
  @IsString()
  url: string;
}

class ImageUpdateDto {
  @ApiPropertyOptional({
    example: ['https://example.com/image1.jpg'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  create?: string[];

  @ApiPropertyOptional({
    type: [ImageItemUpdateDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageItemUpdateDto)
  update?: ImageItemUpdateDto[];

  @ApiPropertyOptional({
    example: ['uuid-image-to-delete'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  delete?: string[];
}

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

export class CreatePropertyDto {
  @ApiProperty({ example: 'Apartemen Menteng' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Jl. Menteng No. 10' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: 'Apartemen premium dekat pusat kota' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'uuid-city-id' })
  @IsUUID()
  cityId: string;

  @ApiProperty({ example: 'uuid-user-id' })
  @IsUUID()
  ownerId: string;

  @ApiPropertyOptional({ type: ImageCreateDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageCreateDto)
  images?: ImageCreateDto;
}

export class UpdatePropertyDto {
  @ApiPropertyOptional({ example: 'Apartemen Menteng Updated' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Jl. Menteng No. 20' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'uuid-city-id' })
  @IsOptional()
  @IsUUID()
  cityId?: string;

  @ApiPropertyOptional({ type: ImageUpdateDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageUpdateDto)
  images?: ImageUpdateDto;
}
