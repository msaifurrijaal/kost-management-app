import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import {
  CreatePropertyDto,
  GetPropertiesDto,
  GetPropertyByIdParamsDto,
  GetPropertyByIdQueryDto,
  UpdatePropertyDto,
} from './dto/property.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getProperties(@Query() query: GetPropertiesDto) {
    return this.propertyService.getProperties(query);
  }

  @Post()
  @Roles('OWNER', 'ADMIN')
  async create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.createProperty(dto);
  }

  @Get(':id')
  async getPropertyById(
    @Param() params: GetPropertyByIdParamsDto,
    @Query() query?: GetPropertyByIdQueryDto,
  ) {
    return this.propertyService.getPropertyById(
      params.id,
      query?.showDeleted || false,
    );
  }

  @Patch(':id')
  @Roles('OWNER', 'ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdatePropertyDto) {
    return this.propertyService.updateProperty(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.propertyService.deleteProperty(id);
  }
}
