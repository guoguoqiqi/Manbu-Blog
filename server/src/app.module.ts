/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 21:38:44
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-05 23:39:37
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { BlogModule } from './logical/blog/blog.module';
import { BlogController } from './logical/blog/blog.controller';

@Module({
  imports: [UserModule, AuthModule, BlogModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
