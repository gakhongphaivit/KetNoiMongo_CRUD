import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: string = 'user',
  ) {
    return this.usersService.create(username, password, role);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }
}
