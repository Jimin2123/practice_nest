/*
  DTO -> 데이터 전송 객체(Data Transfer Object)
  프로그래머로서 코드를 더 간격하게 만들 수 있도록 도와주는 역할
  NestJS에 들어오는 데이터에 대해 유효성 검사를 할 수 있게 해줌
*/

/*
  [ validation pipe]
  IsString()
  IsNumber()
  이렇게 해둘경우 타입값 뿐만 아니라 Input값 마저도 유효성 체크를 하게된다.
*/

import { IsNumber, IsOptional, IsString } from 'class-validator';
// class-validator 공식문서에가면 무엇이 있는지 나와있음

export class CreateMovieDTO {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;

  // validationOption : each true는 모든 요소를 하나씩 검사한다는 의미
  @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];
}
