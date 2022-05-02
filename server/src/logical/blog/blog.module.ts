/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 01:13:49
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 01:26:23
 */
import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  providers: [BlogService],
  exports: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
