/*
 * @Descripttion:
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 23:30:36
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-05 22:56:59
 */
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import * as Moment from 'moment';
import sequelize from 'src/database/sequelize';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { GetUserInfoDTO, RegisterInfoDTO, UpdateUserInfoDTO } from './user.dto';
import { defaultAvator } from 'src/utils/constants';

@Injectable()
export class UserService {
  /**
   * 查询用户信息
   * @param requestBody
   */
  async getUserInfo(requestBody: GetUserInfoDTO): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id userid,
        username,
        email,
        nickname,
        passwd password,
        passwd_salt salt,
        mobile,
        role,
        user_status userstatus,
        avator,
        create_time createtime
      FROM
        user
      WHERE
        username = '${requestBody.username}'
    `;
    try {
      const user = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台
        })
      )[0];
      return {
        result: '1',
        rows: user,
        msg: '查询用户信息成功',
      };
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  /**
   * 更新用户信息 目前只能更新昵称和头像
   * @param requestBody
   * @returns
   */
  async updateUserInfo(requestBody: UpdateUserInfoDTO): Promise<any> {
    const { username, nickname, avator } = requestBody;
    const sql = `
    UPDATE user SET nickname = '${nickname}', avator = '${avator}' WHERE username = '${username}'`;

    try {
      await sequelize.query(sql, {
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      const newUserInfo = await this.getUserInfo({ username });
      return {
        result: '1',
        rows: newUserInfo.rows,
        msg: '更新用户信息成功',
      };
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  /**
   * 用户注册
   * @param requestBody
   */
  async register(requestBody: RegisterInfoDTO): Promise<any> {
    const { username, nickname, password, repassword, mobile, email } =
      requestBody;
    if (password !== repassword) {
      return {
        result: '0',
        rows: null,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.getUserInfo({ username });
    if (user.rows) {
      return {
        result: '0',
        rows: null,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(password, salt); // 加密密码
    const create_time = Moment().format('YYYY-MM-DD HH:mm:ss');

    const registerSQL = `
      INSERT INTO user
        (
          username,
          email,
          nickname,
          passwd,
          passwd_salt,
          mobile,
          role, 
          user_status,
          avator,
          create_time
        )
      VALUES
        (
          '${username}',
          '${email}',
          '${nickname}',
          '${hashPwd}',
          '${salt}',
          '${mobile}',
          2,
          1,
          '${defaultAvator}',
          '${create_time}'
        );
    `;
    try {
      await sequelize.query(registerSQL, { logging: true });
      return {
        result: '1',
        rows: {
          username,
          password,
        },
        msg: '注册成功',
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
