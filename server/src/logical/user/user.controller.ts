/*
 * @Descripttion:
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 23:31:12
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-05 22:53:50
 */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { AuthService } from '../auth/auth.service';
import {
  GetUserInfoDTO,
  LoginInfoDTO,
  RegisterInfoDTO,
  UpdateUserInfoDTO,
} from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiTags('user')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  // @UseGuards(AuthGuard('jwt'))
  @Get('get-user-info')
  getUserInfo(@Query() query: GetUserInfoDTO) {
    return this.userService.getUserInfo(query);
  }

  @ApiTags('user')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  // @UseGuards(AuthGuard('jwt'))
  @Post('update-user-info')
  updateUserInfo(@Body() body: UpdateUserInfoDTO) {
    return this.userService.updateUserInfo(body);
  }

  @ApiTags('user')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Post('register')
  register(@Body() body: RegisterInfoDTO) {
    return this.userService.register(body);
  }

  @ApiTags('user')
  @Post('login')
  async login(@Body() loginParmas: LoginInfoDTO) {
    const authResult = await this.authService.validateUser(
      loginParmas.username,
      loginParmas.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.rows);
      case 2:
        return {
          result: '0',
          rows: null,
          msg: '密码验证错误',
        };
      default:
        return {
          result: '0',
          rows: null,
          msg: '用户名未注册',
        };
    }
  }
}
