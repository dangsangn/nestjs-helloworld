import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './interface';

@Injectable()
export class TaskService {
  tasks: Task[] = [];
  create(createTaskDto: CreateTaskDto): Task {
    const data: Task = {
      complete: false,
      ...createTaskDto,
      id: v4(),
    };
    this.tasks.push(data);
    return data;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    return task;
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

  remove(id: string): string {
    // const findIndex = this.tasks.findIndex((task) => task.id === id);
    // this.tasks.splice(findIndex, 1);
    const newTask = this.tasks.filter((task) => task.id !== id);
    this.tasks = newTask;
    return `This action removes a #${id} task`;
  }
}
