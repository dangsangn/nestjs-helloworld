import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { LoginDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(body: SignUpDto) {
    try {
      const existEmail = await this.prismaService.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (existEmail) {
        throw new ForbiddenException('email is exist');
      }
      const hash = await argon2.hash(body.password);
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          hash,
          firstName: body?.firstName,
          lastName: body?.lastName,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signIn(body: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('email is not correct');
    }
    const verifyPassword = await argon2.verify(user.hash, body.password);
    if (!verifyPassword) {
      throw new ForbiddenException('password is not correct');
    }

    return { access_token: await this.getToken(user.id, user.email) };
  }

  async getToken(id: number, email: string) {
    const payload = {
      sub: id,
      email,
    };
    const secretKey = this.configService.get('SECRET_KEY_JWT');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret: secretKey,
    });
    return token;
  }
}
