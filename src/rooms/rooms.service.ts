import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto, GetRoomsDto, UpdateRoomDto } from './rooms.dto';
import { handleErrorPrismaNotFoundFK } from 'src/utils/errorHandler.util';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(dto: CreateRoomDto) {
    try {
      const firstStatus = await this.prisma.status.findFirst({
        where: {
          code: 'AVAILABLE',
        },
      });

      if (!firstStatus) throw new NotFoundException('Status not found');

      console.log({ dto });

      const room = await this.prisma.room.create({
        data: {
          ...dto,
          statusId: firstStatus.id,
          images: dto.images?.create
            ? { create: dto.images.create.map((url) => ({ url })) }
            : undefined,
        },
        include: { property: true, status: true, images: true },
      });

      return room;
    } catch (error: any) {
      console.log(`❌ Error creating room: ${error}`);
      handleErrorPrismaNotFoundFK(error);
    }
  }

  async updateRoom(id: string, dto: UpdateRoomDto) {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) throw new NotFoundException('Room not found');

    const data: any = { ...dto };

    // Nested images operations
    if (dto.images) {
      data.images = {};

      if (dto.images.create?.length) {
        data.images.create = dto.images.create.map((url) => ({ url }));
      }

      if (dto.images.update?.length) {
        data.images.update = dto.images.update.map((img) => ({
          where: { id: img.id },
          data: { url: img.url },
        }));
      }

      if (dto.images.delete?.length) {
        data.images.deleteMany = dto.images.delete.map((id) => ({ id }));
      }
    }

    const updated = await this.prisma.room.update({
      where: { id },
      data,
      include: { property: true, status: true, images: true },
    });

    return updated;
  }

  async getRooms(dto: GetRoomsDto) {
    const {
      limit = 10,
      page = 1,
      propertyId,
      statusId,
      search,
      showDeleted,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
    } = dto;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (!showDeleted) {
      where.deletedAt = null;
    }

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    if (propertyId) {
      where.propertyId = propertyId;
    }

    if (statusId) {
      where.statusId = statusId;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.room.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip,
        include: { property: true, status: true },
      }),
      this.prisma.room.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
