import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//  NestJS를 쓸 때 TypeScript의 보안도 이용할 수 있고, 유효성 검사도 우리가 따로 하지 않아도 되어 편리하다.

/*
  pipe를 사용하기 위해서 설치해야 하는것.
  npm i class-transformer class-validator @nestjs/typeorm
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 들어오는 데이터에 대해 유효성 검사를 해주는 파이프
  // 파이프란 미들웨어와 비슷한 느낌이라고 생각하면 편함
  app.useGlobalPipes(
    // 쓰고 싶은 파이프를 NestJS 어플리케이션에 넘겨줌
    // whitelist : true -> 데코레이터도 없는 어떠한 프로퍼티의 object를 거릅니다. -> 정의되었있지 않은 데이터를 거른다는 뜻
    // forbidNonWhitelisted-> 이상한 리퀘스트를 보낸다면 리퀘스트 자체를 막아버 림
    // transform -> 유저가 보낸 데이터를 실제 원하는 타입으로 변환해줌
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
