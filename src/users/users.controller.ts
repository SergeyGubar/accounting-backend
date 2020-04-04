import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ access_token: string }> {
    const user = await this.usersService.insert(createUserDto);
    return this.usersService.findOne(user.name, user.password);
  }

  @Post('login')
  async login(@Body() loginDto: { email: string, password: string }): Promise<{ access_token: string }> {
    return this.usersService.findOne(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
