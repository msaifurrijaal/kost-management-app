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
import { RoomsService } from './rooms.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateRoomDto, GetRoomsDto, UpdateRoomDto } from './rooms.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async getRooms(@Query() query: GetRoomsDto) {
    return this.roomsService.getRooms(query);
  }

  @Post()
  @Roles('OWNER', 'ADMIN')
  async create(@Body() dto: CreateRoomDto) {
    return this.roomsService.createRoom(dto);
  }

  @Patch(':id')
  @Roles('OWNER', 'ADMIN')
  async update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomsService.updateRoom(id, dto);
  }

  @Get(':id')
  async getRoomById(
    @Param('id') id: string,
    @Query('showDeleted') showDeleted: boolean = false,
  ) {
    return this.roomsService.getRoomById(id, showDeleted);
  }

  @Delete(':id')
  @Roles('OWNER', 'ADMIN')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.roomsService.deleteRoom(id);
  }
}
