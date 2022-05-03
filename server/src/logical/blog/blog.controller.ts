/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 01:14:11
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 22:15:59
 */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import {
  BlogBodyDto,
  BlogPageDto,
  DeleteBlogDto,
  GetBlogDto,
} from './blog.dto';
import { BlogService } from './blog.service';

// @UseGuards(AuthGuard('jwt'))
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @ApiTags('blog')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Get('get-blog-list')
  getBlogList(@Query() query: BlogPageDto) {
    return this.blogService.getBlogList(query);
  }

  @ApiTags('blog')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(AuthGuard('jwt'))
  @Post('publish_blog')
  publishBlog(@Body() body: BlogBodyDto) {
    return this.blogService.publishBlog(body);
  }

  @ApiTags('blog')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @UseGuards(AuthGuard('jwt'))
  @Post('delete-blog')
  deleteBlog(@Query() query: DeleteBlogDto) {
    return this.blogService.deleteBlog(query);
  }

  @ApiTags('blog')
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Get('get-blog-detail')
  getBlogDetail(@Query() query: GetBlogDto) {
    return this.blogService.getBlogDetail(query);
  }
}
