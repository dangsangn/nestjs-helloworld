import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  Body,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('/me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  async editUser(@GetUser('id') userId: number, @Body() edit: UpdateUserDto) {
    return await this.userService.updateUser(userId, edit);
  }
}
