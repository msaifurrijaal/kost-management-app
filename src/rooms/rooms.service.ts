import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto, GetRoomsDto } from './rooms.dto';
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
