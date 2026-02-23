import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  IsEmail,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersDto {
  @ApiPropertyOptional({
    description: 'Page number for pagination',
    example: 1,
    default: 1,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filter users by active rental property ID',
    example: 'uuid-property-id',
    type: String,
  })
  @IsOptional()
  @IsString()
  propertyId?: string;

  @ApiPropertyOptional({
    description: 'Search by full name or email (case insensitive)',
    example: 'andi',
    type: String,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter users by role ID',
    example: 'uuid-role-id',
    type: String,
  })
  @IsOptional()
  @IsString()
  roleId?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({ example: 'john@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '08123456789' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Jl. Mawar No.1' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '1234567890123456' })
  @IsOptional()
  @IsString()
  nik?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsUUID()
  roleId?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsUUID()
  cityId?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsUUID()
  provinceId?: string;
}
