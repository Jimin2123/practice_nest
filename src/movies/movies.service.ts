import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './DTO/create-movie-dto';
import { UpdateMovieDTO } from './DTO/update-movie-dto';
import { Movie } from './entities/movie.entity';

/* 
  서비스는 로직을 관리하는 역할이다
  한 개의 요소가 한가지 기능은 꼭 책임저야 한다.
*/
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  // parameter id 타입이 string인 이유 : url에서 보낸 값을 뭐든지 일단 string이기 때문에 다시 number로 바꿔준 것이다.
  // 하지만 pipe에서 transform을 적용함으로써 타입을 number로 바꿔서 사용이 가능함
  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID : ${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number): void {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  // parameter가 object일때는 따로 타입을 부여해서 사용한다. (타입스크립트의 기본) -> DTO라는 파일임.
  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
