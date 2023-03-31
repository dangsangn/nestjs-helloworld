import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const task = await this.taskService.create(createTaskDto);
    return res.status(HttpStatus.OK).json(task);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const tasks = await this.taskService.findAll();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get('filter')
  @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
  filter(@Query() query: QueryTaskDto, @Res() res: Response) {
    const tasks = this.taskService.filter(query.complete);
    return res.status(200).json(tasks);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Res() res: Response) {
    const task = this.taskService.findOne(id);
    return res.status(200).json(task);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response,
  ) {
    const task = this.taskService.update(id, updateTaskDto);
    return res.status(201).json(task);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    const data = this.taskService.remove(id);
    return res.status(201).json(data);
  }
}
