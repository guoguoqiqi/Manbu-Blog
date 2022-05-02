/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 23:30:54
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 00:38:26
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  // controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
