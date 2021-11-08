import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/*
  각 모듈에는 모듈에 역할에 맞는 controller와 provider가 존재해야함 왜나하면 NestJS에서 앱은 여러 개의 모듈로 구성되어야 하기 때문
  [ 잘못된 예 ]
  app.module.ts
  - controllers: [MoviesController],
  - providers: [MoviesService],

  [ 맞는 예 ]
  app.module.ts
  - controllers: [AppController],
  - providers: [AppService],
*/

@Module({
  // 따로 생성한 모듈은 import에 들어가게 된다.
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
