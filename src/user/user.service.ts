import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async updateUser(userId: number, dto: UpdateUserDto) {
    const updateUser = await this.prismaService.user.update({
      where: { id: userId },
      data: { ...dto },
    });
    delete updateUser.hash;
    return updateUser;
  }
}
