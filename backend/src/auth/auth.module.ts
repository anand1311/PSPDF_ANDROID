import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppService } from 'src/app.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SECRET_KEY_HERE',
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    AppService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
