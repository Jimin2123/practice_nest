import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDTO } from './create-movie-dto';

/*
  부분 타입 (Partial Types) NESTJS의 기능중 하나이다
  npm i @nestjs/mapped-types로 설치해야 사용가능
  DTO를 변환시키는걸 도와주는 역할
*/

// ParualType은 베이스 타입이 필요함. CreateMovieDTO를 사용
// UpdateMovieDTO는 기본적으로 CreateMovieDTO와 똑같음 하지만 모든 값이 필수로 들어가지 않아도 괜찮다.
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
