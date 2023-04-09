import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task as TaskEntity } from './entities/task.entity';
import { Task } from './interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}
  tasks: Task[] = [];

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.create(createTaskDto);
  }

  findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<TaskEntity> {
    return this.taskRepository.findOne({ id });
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  filter(complete: boolean): Task[] {
    const tasks = this.tasks.filter((task) => task.complete === complete);
    return tasks;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const findIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks[findIndex] = { ...updateTaskDto, id };
    return this.tasks[findIndex];
  }
}
