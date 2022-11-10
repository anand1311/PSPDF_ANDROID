import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto, userId: number) {
    const {id} = await this.prisma.post.create({
      data: { ...data, authorId: userId },
    });
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    return {
      data: post,
      message: 'Post created successfully',
    };
  }

  async findAll() {
    const posts = await this.prisma.post.findMany({
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    return {
      data: posts,
    };
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (post) {
      return {
        data: post,
      };
    } else {
      throw new NotFoundException('Post not found');
    }
  }

  async update(id: number, data: UpdatePostDto, userId: number) {
    const post = await this.findOne(+id);
    if (post.data.authorId === userId) {
      const updatedPost = await this.prisma.post.update({
        where: { id },
        data,
        include: { author: { select: { id: true, name: true, email: true } } },
      });
      return {
        data: updatedPost,
        message: 'Post updated successfully',
      };
    } else {
      throw new ForbiddenException(`You don't have access to update this post`);
    }
  }

  async remove(id: number, userId: number) {
    const post = await this.findOne(+id);
    if (post.data.authorId === userId) {
      await this.prisma.post.delete({ where: { id } });
      return {
        message: 'Post deleted successfully',
      };
    } else {
      throw new ForbiddenException(`You don't have access to delete this post`);
    }
  }
}
