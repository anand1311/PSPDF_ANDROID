import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  login(@Body() data: LoginUserDto) {
    return this.authService.login(data);
  }

  @Post('/register')
  register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }
}
