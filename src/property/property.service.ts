import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto, UpdatePropertyDto } from './dto/property.dto';

@Injectable()
export class PropertyService {
  constructor(private readonly prisma: PrismaService) {}

  async createProperty(dto: CreatePropertyDto) {
    const city = await this.prisma.city.findUnique({
      where: { id: dto.cityId },
    });
    if (!city) throw new NotFoundException('City not found');

    const owner = await this.prisma.user.findUnique({
      where: { id: dto.ownerId },
    });
    if (!owner) throw new NotFoundException('Owner not found');

    console.log({ dto });

    const property = await this.prisma.property.create({
      data: {
        name: dto.name,
        address: dto.address,
        description: dto.description,
        cityId: dto.cityId,
        ownerId: dto.ownerId,
        images: dto.images?.create
          ? { create: dto.images.create.map((url) => ({ url })) }
          : undefined,
      },
      include: { city: true, owner: true, images: true },
    });

    return property;
  }

  async updateProperty(id: string, dto: UpdatePropertyDto) {
    const property = await this.prisma.property.findUnique({ where: { id } });
    if (!property) throw new NotFoundException('Property not found');

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

    const updated = await this.prisma.property.update({
      where: { id },
      data,
      include: { city: true, owner: true, images: true },
    });

    return updated;
  }
}
