/*
  서비스로 보내고 받을 클래스(인터페이스)를 export 하는 역할
  보통 entity는 실제 데이터베이스의 모델을 만들때 사용한다.
  이 예제에서는 데이터베이스에 대한 내용은 안들어갔기 때문에 그냥 폼만 잠는것.
*/
export class Movie {
  id: number;
  title: string;
  year: number;
  genres: string[];
}
