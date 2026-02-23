import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  GetUserByIdDto,
  GetUsersDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(@Query() query: GetUsersDto) {
    return this.userService.getUsers(query);
  }

  @Patch('change-password')
  async changePassword(@Req() req, @Body() dto: UpdatePasswordDto) {
    return this.userService.updatePassword(req.user.sub, dto);
  }

  @Get(':id')
  async getUserById(@Param() params: GetUserByIdDto) {
    return this.userService.getUserById(params.id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }
}
