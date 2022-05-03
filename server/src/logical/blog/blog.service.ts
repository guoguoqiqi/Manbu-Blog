/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 01:13:38
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 15:58:01
 */
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from 'src/database/sequelize';
import * as Moment from 'moment';
import {
  BlogPageDto,
  BlogBodyDto,
  DeleteBlogDto,
  GetBlogDto,
} from './blog.dto';

@Injectable()
export class BlogService {
  /**
   * 获取博客列表
   * @param query
   */
  async getBlogList(query: BlogPageDto): Promise<any | undefined> {
    const { pageIndex, pageSize } = query;

    const getBlogTotalSql = `
     SELECT count(*) from blog WHERE isDelete = '0';
    `;

    const getBlogListSql = `
      SELECT * from blog WHERE isDelete = '0' order by publish_time desc limit ${
        (pageIndex - 1) * pageSize
      },${pageSize} ; 
    `;

    try {
      const blogTotal = await sequelize.query(getBlogTotalSql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: false, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });

      const blogList = await sequelize.query(getBlogListSql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: false, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      return {
        result: '1',
        rows: blogList,
        total: blogTotal[0]['count(*)'],
        msg: '查询成功',
      };
    } catch (error) {
      console.log(error);
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  /**
   * 发布博客
   * @param body
   */
  async publishBlog(body: BlogBodyDto): Promise<any | undefined> {
    const {
      username,
      blog_title,
      blog_tags,
      blog_content,
      thumbnail,
      describtion,
    } = body;
    const publish_time = Moment().format('YYYY-MM-DD HH:mm:ss');
    const read_count = 0;
    const like_count = 0;
    const comment_count = 0;
    const isDelete = 0;

    const publishBlogSql = `
      INSERT INTO blog
        (
          username,
          read_count,
          blog_title,
          blog_tags,
          blog_content,
          publish_time,
          like_count,
          comment_count,
          thumbnail,
          describtion,
          isDelete
        )
      VALUES
        (
          '${username}',
          '${read_count}',
          '${blog_title}',
          '${blog_tags}',
          '${blog_content}',
          '${publish_time}',
          '${like_count}',
          '${comment_count}',
          '${thumbnail}',
          '${describtion}',
          '${isDelete}'
        );
    `;
    try {
      await sequelize.query(publishBlogSql, { logging: true });
      return {
        result: '1',
        rows: null,
        msg: '发布成功',
      };
    } catch (error) {
      console.log(error);
      return {
        result: '0',
        rows: null,
        msg: '服务异常',
      };
    }
  }

  /**
   * 删除博客
   * @param query
   */
  async deleteBlog(query: DeleteBlogDto): Promise<any | undefined> {
    const { blog_id } = query;
    const deleteBlogSql = `UPDATE blog SET isDelete = '1' WHERE blog_id = '${blog_id}'`;

    try {
      await sequelize.query(deleteBlogSql, { logging: true });
      return {
        result: '1',
        rows: null,
        msg: '删除成功',
      };
    } catch (error) {
      console.log(error);
      return {
        result: '0',
        rows: null,
        msg: '服务异常',
      };
    }
  }

  /**
   * 获取博客详情
   * @param query
   */
  async getBlogDetail(query: GetBlogDto): Promise<any | undefined> {
    const { blog_id } = query;
    const getBlogSql = `SELECT * FROM blog WHERE blog_id = '${blog_id}'`;

    try {
      const blog = await sequelize.query(getBlogSql, { logging: true });
      if (!blog[0][0]) {
        return {
          result: '0',
          rows: null,
          msg: '无效的博客ID',
        };
      }
      const { isDelete } = blog[0][0] as any;

      if (isDelete === 1) {
        return {
          result: '0',
          rows: null,
          msg: '无效的博客ID',
        };
      }
      return {
        result: '1',
        rows: blog[0][0],
        msg: '获取详情成功',
      };
    } catch (error) {
      return {
        result: '0',
        rows: null,
        msg: '服务异常',
      };
    }
  }
}
