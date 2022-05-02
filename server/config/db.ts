/*
 * @Descripttion: 数据库参数配置
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 22:13:13
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-01 22:26:42
 */

const productConfig = {
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    user: 'root1',
    password: 'root',
    database: 'man_bu_blog', // 库名
    connectionLimit: 10, // 连接限制
    charset: 'utf8mb4',
  },
};

const localConfig = {
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    user: 'root2',
    password: 'root',
    database: 'man_bu_blog', // 库名
    connectionLimit: 10, // 连接限制
    charset: 'utf8mb4',
  },
};

// 我本地和服务器数据库参数稍有不同，以此来区分，如果本地和服务器数据库参数完全一致，这里也可以不用做两套配置
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
