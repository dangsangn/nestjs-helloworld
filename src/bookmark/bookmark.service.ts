import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto';
import { UpdateBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getListBookmarks(userId: number) {
    const list = await this.prisma.bookmark.findMany({ where: { userId } });
    return list;
  }

  async getBookmarkById(userId: number, id: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: { userId, id },
    });
    return bookmark;
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }
}
