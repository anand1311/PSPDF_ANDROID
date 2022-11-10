import { Prisma } from '.prisma/client';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return {
      data: users,
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true },
    });
    if (user) {
      return {
        data: user,
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput, userId: number) {
    if (id !== userId) {
      throw new ForbiddenException(
        `You don't have acccess to update this user`,
      );
    }
    const user = await this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return {
      data: user,
      message: 'User updated successfully',
    };
  }
}
