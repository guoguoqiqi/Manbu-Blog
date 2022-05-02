/*
 * @Descripttion: SQL语句文件
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 22:23:16
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-02 01:41:09
 */

// 创建漫步博客数据库 man_bu_blog
const databaseUtf8 = `CREATE DATABASE man_bu_blog DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;`;
const databaseUtf8mb4 = `CREATE DATABASE man_bu_blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`;

// 创建用户表 user
const user = `CREATE TABLE user (
  user_id smallint(6) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  username varchar(24) NOT NULL COMMENT '用户账号',
  email varchar(64) NOT NULL COMMENT '用户邮箱',
  nickname varchar(20) NOT NULL COMMENT '昵称',
  passwd char(32) NOT NULL COMMENT '密码',
  passwd_salt char(6) NOT NULL COMMENT '密码盐',
  mobile varchar(15) NOT NULL DEFAULT '0' COMMENT '手机号码',
  role tinyint(4) NOT NULL DEFAULT '2' COMMENT '用户角色: 0-超级管理员|1-管理员|2-普通用户',
  user_status tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态: 0-失效|1-有效|2-删除',
  create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (user_id),
  KEY idx_m (username)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='用户表';`;

// 创建博客表 blog
const blog = `CREATE TABLE blog (
  blog_id smallint(6) NOT NULL AUTO_INCREMENT COMMENT '博客ID',
  username varchar(24) NOT NULL COMMENT '作者',
  read_count smallint(6) NOT NULL COMMENT '阅读数量',
  blog_title varchar(64) NOT NULL COMMENT '博客题目',
  blog_tags varchar(100) NOT NULL COMMENT '博客标签',
  blog_content varchar(2048) NOT NULL COMMENT '博客内容',
  publish_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  isDelete tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (blog_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='博客表';`;
