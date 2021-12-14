# Hero Sleact

- 제로초의 Sleact 강좌 정리

## 1일차

### back 세팅

- [제로초의 sleact 저장소](https://github.com/ZeroCho/sleact)
- 위 저장소에서 back 폴더 복사 이후 .env 파일 생성

```env
COOKIE_SECRET=sleactcookie
MYSQL_PASSWORD=qwer1234
```

- [MySQL 다운로드](https://dev.mysql.com/downloads/installer)
- MySQL 및 워크벤치 다운로드 및 설치

- DB 생성

```command
npm i
npx sequelize db:create
```

- 테이블 생성

```command
npm run dev
```

- Ctrl + C 로 빠져나와서, seeders 폴더 안의 목업 데이터 세팅

```command
npx sequelize db:seed:all
```

### front 세팅

```command
npm i
```

```ts (webpack.config.ts)
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
```

- 웹팩 플러그인 ForkTsCheckerWebpackPlugin: 타입스크립트 체킹와 웹팩 실행이 동시에 돌아간다. 성능이 좋아짐

### 코드 스플리팅 적용

```command
npm i @loadable/component
npm i --save-dev @types/loadable__component
```

```ts
import loadable from "@loadable/component";

const LogIn = loadable(() => import("@pages/LogIn"));
```

- [제로초의 sleact 저장소 - alecture](https://github.com/ZeroCho/sleact/tree/master/alecture)

```command
npm i @emotion/styled @emotion/react
```
