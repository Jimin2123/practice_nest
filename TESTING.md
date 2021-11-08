jest는 자바스크립트를 아주 쉽게 테스팅하는 npm 패키지이다.
.spec.ts는 테스트를 포함한 파일이다.
ex) movies.controller.ts라는 파일을 테스팅하고 싶다면 .spec.ts라는 파일이 필요하다.
NestJS에서 jest가 .spec.ts 파일들을 찾아 볼 수 있도록 설정 되어 있다.

1. test:cov -> 코드가 얼마나 테스팅 됐는지 또는 안 됐는지 알려준다.
2. test:watch -> 모든 테스트 파일을 찾아내서 거기서 무슨 일이 일어나는지 관찰

유닛 테스팅은 모든 function을 따로 테스트하는 방식이다.

e2e(end-to-end) 테스팅 -> 애플리케이션의 모든 부분을 테스트할 때 사용한다

NestJS는 테스트마다 어플리케이션을 생성한다

1. 브라우저에서 테스트할 수 있는 진짜 어플리케이션
2. 각 모듈을 위한 어플리케이션
   이 두개는 전혀 다른 것이다.

e2e 테스트에서 가장 중요한 것은 실제 어플리케이션의 환경을 그대로 적용시켜줘야 한다.
ex) pipe를 사용하기 위해서

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```
