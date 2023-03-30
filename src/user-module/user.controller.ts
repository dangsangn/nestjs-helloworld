import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Patch,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UseFilters } from '@nestjs/common/decorators';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { HttpExceptionFilter } from './filters/index';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    const data = await this.userService.getUsers();
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  async getUser(@Param('id') id: string, @Res() res: Response) {
    const data = await this.userService.getUser(id);
    return res.status(HttpStatus.OK).json(data);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async postUser(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const data = await this.userService.postUser(userDto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const data = await this.userService.updateUser(id, userDto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.userService.deleteUser(id);
    return res.status(HttpStatus.OK).json('Delete successfully');
  }
}
