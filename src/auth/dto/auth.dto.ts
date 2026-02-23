import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'example@mail.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password (plain text, will be hashed)',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({
    example: '08123456789',
    description: 'User phone number',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Jl. Mawar No. 10',
    description: 'User address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: '3578010101010001',
    description: 'National ID number (NIK)',
  })
  @IsOptional()
  @IsString()
  nik?: string;

  @ApiPropertyOptional({
    example: 'uuid-city-id',
    description: 'City ID (foreign key)',
  })
  @IsOptional()
  @IsString()
  cityId?: string;

  @ApiPropertyOptional({
    example: 'uuid-province-id',
    description: 'Province ID (foreign key)',
  })
  @IsOptional()
  @IsString()
  provinceId?: string;

  @ApiProperty({
    example: 'uuid-role-id',
    description: 'Role ID (foreign key)',
  })
  @IsString()
  @IsNotEmpty()
  roleId: string;
}

export class LoginDto {
  @ApiProperty({ example: 'example@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
