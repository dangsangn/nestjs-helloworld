import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/User.interface';

@Injectable()
export class UserService {
  private users: User[] = [];
  getUser(email: string): User {
    const user = this.users.find((u: User) => u.email === email);
    if (user) {
      return user;
    }
    throw new NotFoundException('user not found');
  }
  getUsers(): User[] {
    return this.users;
  }
  postUser(user: User): User[] {
    this.users.push(user);
    return this.users;
  }
  deleteUser(email: string): User[] {
    const remainderUser = this.users.filter(
      (user: User) => user.email !== email,
    );
    this.users = remainderUser;
    return remainderUser;
  }
}
