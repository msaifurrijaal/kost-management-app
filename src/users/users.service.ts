import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersDto, UpdatePasswordDto, UpdateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(query: GetUsersDto) {
    const {
      page = 1,
      limit = 10,
      propertyId,
      search,
      roleId,
      showDeleted,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (!showDeleted) {
      where.deletedAt = null;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (roleId) {
      where.roleId = roleId;
    }

    if (propertyId) {
      where.rentals = {
        some: {
          propertyId,
        },
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          role: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string, includeDeleted = false) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        ...(includeDeleted ? {} : { deletedAt: null }),
      },
      include: {
        role: true,
        city: true,
        province: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingEmail) {
        throw new BadRequestException('Email already used');
      }
    }

    if (dto.roleId) {
      const role = await this.prisma.role.findUnique({
        where: { id: dto.roleId },
      });

      if (!role) {
        throw new BadRequestException('Role not found');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: dto,
      include: {
        role: true,
        city: true,
        province: true,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = updatedUser;

    return result;
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);

    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: 'Password updated successfully',
    };
  }
}
