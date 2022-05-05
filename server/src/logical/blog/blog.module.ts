/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 01:13:49
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-05 23:40:33
 */
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [UserModule, UserService],
  providers: [BlogService],
  exports: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
