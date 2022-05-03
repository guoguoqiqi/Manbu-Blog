/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 00:46:59
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 19:01:10
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterInfoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty({ message: '昵称不能为空' })
  @IsString({ message: '昵称必须是 String 类型' })
  readonly nickname: string;
  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
  @ApiProperty()
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string;
  @ApiProperty()
  @IsNotEmpty({ message: '邮箱不能为空' })
  readonly email: string;
}

export class LoginInfoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}
