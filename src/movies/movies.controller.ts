import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDTO } from './DTO/create-movie-dto';
import { UpdateMovieDTO } from './DTO/update-movie-dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

/*
  컨트롤러는 URL을 매핑하고, 리퀘스트를 받고, query를 넘기거나 body나 그 외의 것들을 넘기는 역할이다.

  필요한 데이터가 있으면 데코레이터를 사용하여 직접 요청해야 데이터를 사용할 수 가 있다.
  ex) body request를 받아오기 위해서는 @Body()데코레이터를 사용해야한다.
  Tip: express에서는 body를 json으로 리턴하려면 설정을 만져야했지만 nest에서는 그럴 필요가 없다.

  NestJS는 Express위에서 돌아가기 때문에 Request, Response 객체를 사용할 수 있다.
  @Req() req, @Res() res 를 사용해서 Express 앱에 접근할 수 있다.
  하지만 Express 객체를 직접적으로 사용하는 방법은 좋은 방법은 아니다.
  NestJS는 Fastify와 Express 프레임워크를 둘다 사용할 수 있다.
*/

// URL의 엔트리 포인트(Entry Point)를 컨트롤함 ex : localhost:3000/movies
@Controller('movies')
export class MoviesController {
  // Service에 접근하는 방법
  constructor(private readonly moviesService: MoviesService) {}

  // localhost:3000/movies
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  // search 부분이 Get('id')보다 및에 있으면 nestJS는 search를 id로 판단하게 된어 search부분은 실행되지 않게된다. (이런 부분은 조심하자)
  // localhost:3000/movies/search?year=
  @Get('search')
  // @Query('year') 데코레이터는 URL에 있는 year query를 가져올때 사용한다.
  search(@Query('year') searchingYear: string) {
    return `we are searching for a movie made after : ${searchingYear}`;
  }

  // localhost:3000/movies/id
  @Get(':id')
  // @Param('id')데코레이터는 URL에 있는 id parameter를 가져올때 사용
  // id parameter를 id라는 argument에 string타입으로 저장함
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  // localhost:3000/movies -> body : JSON
  @Post()
  // @Body() 데코레이터는 리퀘스트의 body를 가져올때 사용
  createMovie(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  // 리소스의 일부만 업데이트할때 사용
  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateData: UpdateMovieDTO) {
    // 업데이트할 movie의 id랑 우리가 보낼 데이터의 오브젝트를 리턴
    return this.moviesService.update(id, updateData);
  }

  // 모든 리소스를 업데이트할때 사용
  @Put()
  put() {
    return `This will update a movies`;
  }
}
