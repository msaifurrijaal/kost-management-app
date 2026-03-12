import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: 'Kasur' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'Kasur' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({ example: 'uuid-property-id' })
  @IsUUID()
  propertyId: string;
}

export class UpdateInventoryDto {
  @ApiPropertyOptional({ example: 'Kasur' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'Kasur' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiPropertyOptional({ example: 'uuid-property-id' })
  @IsOptional()
  @IsUUID()
  propertyId: string;
}
