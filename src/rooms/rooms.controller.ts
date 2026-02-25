import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateRoomDto } from './rooms.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @Roles('OWNER', 'ADMIN')
  async create(@Body() dto: CreateRoomDto) {
    return this.roomsService.createRoom(dto);
  }
}
