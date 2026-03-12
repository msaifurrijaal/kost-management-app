import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventories.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  @Roles('OWNER', 'ADMIN')
  async create(@Body() dto: CreateInventoryDto) {
    return this.inventoriesService.createInventory(dto);
  }

  @Patch(':id')
  @Roles('OWNER', 'ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.inventoriesService.updateInventory(id, dto);
  }
}
