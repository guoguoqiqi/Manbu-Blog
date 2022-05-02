/*
 * @Descripttion: 加密工具方法
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 23:27:01
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-01 23:28:13
 */

import * as crypto from 'crypto';

/**
 * 制作盐
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * 加密密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}
