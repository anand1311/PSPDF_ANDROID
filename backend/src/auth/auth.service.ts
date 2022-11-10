import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      if (user.password !== password) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      delete user.password;
      return {
        user,
        jwt: this.jwtService.sign({ id: user.id, email: user.email }),
      };
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async register(data: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (!existingUser) {
      const user = await this.prisma.user.create({ data });
      delete user.password;
      return {
        user,
        jwt: this.jwtService.sign({ id: user.id, email: user.email }),
      };
    }
    throw new HttpException('User already exists', HttpStatus.CONFLICT);
  }
}
