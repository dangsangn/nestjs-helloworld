import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './interfaces/User.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }
  @Get(':email')
  getUser(@Param('email') email: string): User {
    return this.userService.getUser(email);
  }
  @Post()
  @UsePipes(new ValidationPipe())
  postUser(@Body() userDto: CreateUserDto): User[] {
    return this.userService.postUser(userDto);
  }
  @Delete(':email')
  deleteUser(@Param('email') email: string): User[] {
    return this.userService.deleteUser(email);
  }
}
