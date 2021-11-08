import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get('/:title')
  getTitle(@Param('title') title: string) {
    return this.moviesService.getMovieByTitle(title);
  }

  @Post('')
  addMovies(
    @Query('year') year: number,
    @Query('page') page: number,
  ): Promise<Movie[]> {
    return this.moviesService.addMoviesByPage(year, page);
  }
}
