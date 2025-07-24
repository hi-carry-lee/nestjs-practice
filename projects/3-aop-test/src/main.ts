import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log('全局中间件 - before', req.url);
    next();
    console.log('全局中间件 - after');
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
