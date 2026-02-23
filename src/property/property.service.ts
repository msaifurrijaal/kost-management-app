import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto } from './dto/property.dto';

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

    const property = await this.prisma.property.create({
      data: {
        name: dto.name,
        address: dto.address,
        description: dto.description,
        cityId: dto.cityId,
        ownerId: dto.ownerId,
      },
      include: {
        city: true,
        owner: true,
      },
    });

    return property;
  }
}
