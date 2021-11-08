import fs from 'fs';
import * as iconv from 'iconv-lite';
// import * as charset from 'charset';
import * as cheerio from 'cheerio';
import * as request from 'request';

async function decoding(res, body) {
  // const enc = charset(res.headers, body); // 해당 사이트의 charset값을 획득
  const decoded = iconv.decode(body, 'utf8'); // 획득한 charset값으로 body를 디코딩
  const $ = cheerio.load(decoded);

  return $;
}

export function getDecodingData(uri: string): any {
  const info = {
    method: 'GET',
    uri: uri,
    headers: { 'User-Agent': 'Mozilla/5.0' },
    encoding: null,
  };

  return new Promise((resolve, reject) => {
    request(info, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        const decodingPage = decoding(res, body);
        resolve(decodingPage);
      } else {
        reject(err);
      }
    });
  });
}

function checkGenre(detail: string) {
  const jsonData = readJsonData();
  let genre = null;

  for (let i = 0; i < jsonData.genre.length; i++) {
    if (detail.includes(jsonData.genre[i])) {
      genre = jsonData.genre[i];
    }
  }

  return genre;
}

export function changeGrade(detial: string) {
  const grades = ['전체', '12세', '15세', '청소년'];
  let item = null;
  for (const grade in grades) {
    if (detial.includes(grades[grade])) {
      const gradeIdx = [7, 12, 15, 19];
      item = gradeIdx[grade];
    }
  }
  return item;
}

export const readJsonData = () => {
  const readJson = fs.readFileSync('movie.json');
  const dataJson = readJson.toString();
  const data = JSON.parse(dataJson);
  return data;
};

export const writeJsonData = (year, list) => {
  const jsonData = JSON.stringify(list);
  fs.writeFile(`${year}.json`, jsonData, (err) => {
    if (err) console.error(err);
  });
};
