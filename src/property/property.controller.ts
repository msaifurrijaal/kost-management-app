import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PropertyService } from './property.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreatePropertyDto } from './dto/property.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @Roles('OWNER', 'ADMIN')
  async createProperty(@Body() dto: CreatePropertyDto) {
    return this.propertyService.createProperty(dto);
  }
}
