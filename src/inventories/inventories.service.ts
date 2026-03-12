import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventories.dto';
import { handleErrorPrisma } from 'src/utils/errorHandler.util';

@Injectable()
export class InventoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createInventory(dto: CreateInventoryDto) {
    try {
      const inventory = await this.prisma.inventory.create({
        data: {
          ...dto,
        },
      });

      return inventory;
    } catch (error: any) {
      handleErrorPrisma(error);
    }
  }

  async updateInventory(id: string, dto: UpdateInventoryDto) {
    try {
      const inventory = await this.prisma.inventory.update({
        where: { id },
        data: {
          ...dto,
        },
      });

      return inventory;
    } catch (error: any) {
      handleErrorPrisma(error);
    }
  }
}
