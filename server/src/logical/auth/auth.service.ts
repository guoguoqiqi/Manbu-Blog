/*
 * @Descripttion: your project
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-02 00:18:48
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 00:34:53
 */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // JWT验证 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const result = await this.userService.getUserInfo(username);
    const user = result.rows;
    if (user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        return {
          result: '1',
          code: 1,
          rows: user,
          msg: '密码验证正确',
        };
      } else {
        return {
          result: '0',
          code: 2,
          rows: null,
          msg: '密码验证错误',
        };
      }
    }
    return {
      result: '0',
      code: 3,
      rows: null,
      msg: '用户名未注册',
    };
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      nickname: user.nickname,
      role: user.role,
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = this.jwtService.sign(payload);
      return {
        result: '1',
        rows: {
          token,
        },
        msg: `登录成功`,
      };
    } catch (error) {
      return {
        result: '1',
        rows: null,
        msg: `账号或密码错误`,
      };
    }
  }
}
