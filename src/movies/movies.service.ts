import { Injectable } from '@nestjs/common';
import { changeGrade, getDecodingData } from 'src/util';
import { Movie } from './entities/movie.entity';
const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; //특수문자

@Injectable()
export class MoviesService {
  list: Movie[] = [];

  getMovieByTitle(title: string): Movie[] {
    const searchList = [];
    for (let i = 0; i < this.list.length; i++) {
      const find =
        this.list[i].title.includes(title) ||
        this.list[i].subtitle.includes(title);
      if (find) {
        searchList.push(this.list[i]);
      }
    }
    return searchList;
  }

  async addMoviesByPage(year: number, page: number): Promise<Movie[]> {
    const uri = `https://movie.naver.com/movie/sdb/browsing/bmovie.nhn?open=${year}&page=${page}`;
    const data = await getDecodingData(uri);
    const dir_list = data('ul.directory_list').children('li');
    const movieInfo = dir_list.map((idx, elem) => {
      const href = elem.children[1].attribs.href;
      const code = ~~href.split('/movie/bi/mi/basic.naver?code=').join('');
      const beforeTitle = elem.children[1].lastChild.data;
      let subtitle = beforeTitle.match(/ *\([^)]*\) */g);
      const title = beforeTitle
        .split(/ *\([^)]*\) */g)
        .join('')
        .trim();
      if (subtitle !== null)
        subtitle = subtitle.join('').split(regExp).join('').trim();
      const detail = String(data(elem).find('.detail').text().trim());
      const grade = changeGrade(detail);
      // const genre = checkGenre(detail);

      return { code, title, subtitle, grade };
    });

    for (const i of movieInfo) {
      this.list.push(i);
    }

    return this.list;
  }
}
