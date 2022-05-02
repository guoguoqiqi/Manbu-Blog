/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 00:46:59
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 02:06:36
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BlogPageDto {
  @ApiProperty()
  @IsNotEmpty({ message: '页码不能为空' })
  readonly pageIndex: number;
  @ApiProperty()
  @IsNotEmpty({ message: '每页数量不能为空' })
  readonly pageSize: number;
}

export class BlogBodyDto {
  @ApiProperty()
  @IsNotEmpty({ message: '作者不能为空' })
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty({ message: '标题不能为空' })
  readonly blog_title: string;

  @ApiProperty()
  @IsNotEmpty({ message: '标签不能为空' })
  readonly blog_tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: '内容不能为空' })
  readonly blog_content: string;
}

export class DeleteBlogDto {
  @ApiProperty()
  @IsNotEmpty({ message: '博客ID不能为空' })
  readonly blog_id: string;
}

export class GetBlogDto {
  @ApiProperty()
  @IsNotEmpty({ message: '博客ID不能为空' })
  readonly blog_id: string;
}
