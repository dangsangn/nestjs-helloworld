import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/User.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  public async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user) {
      return user;
    }
    throw new NotFoundException('user not found');
  }

  public async getUsers(): Promise<User[]> {
    const users = await this.userModel.find({});
    return users;
  }

  public async postUser(user: CreateUserDto) {
    const data = this.userModel.create(user);
    return data;
  }

  public async updateUser(id: string, user: UpdateUserDto) {
    const data = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });

    return data;
  }

  public async deleteUser(id: string) {
    const remainderUser = await this.userModel.findByIdAndDelete(id);
    return remainderUser;
  }
}
