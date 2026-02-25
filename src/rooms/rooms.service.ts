import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './rooms.dto';
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
        },
        include: { property: true, status: true },
      });

      return room;
    } catch (error: any) {
      console.log(`❌ Error creating room: ${error}`);
      handleErrorPrismaNotFoundFK(error);
    }
  }
}
