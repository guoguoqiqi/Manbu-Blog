/*
 * @Descripttion: 主入口文件
 * @version: v1.0.0
 * @Author: GuoQi
 * @Date: 2022-05-01 21:38:44
 * @LastEditors: GuoQi
 * @LastEditTime: 2022-05-03 23:16:12
 */
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  /**
   * 通过传入平台类型 NestExpressApplication app可访问Express底层API
   */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // For parsing application/json
  app.use(express.json());
  // For parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
  // 全局路由前缀
  app.setGlobalPrefix('manbu-blog-v1');
  // 允许跨域
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('Manbu-Blog-Server')
    .setDescription('漫步者博客服务接口文档')
    .setVersion('1.0.0')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(5002);
}
bootstrap();
