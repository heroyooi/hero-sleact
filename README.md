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
- 위 저장소 폴더에서 제로초가 미리 짜둔 소스 복붙

### CssInJs 방식으로 컴포넌트 제작

```command
npm i @emotion/styled @emotion/react
```

## 2일차

```ts
import { useState, useCallback, Dispatch, SetStateAction } from "react";

type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialData: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};
```

- 커스텀훅 제작시 매개변수는 타입추론이 안 되어서 제네릭을 활용하여 타입을 정의해준다.
- 타입스크립트를 하면 가독성이 상당히 안좋아진다. 하지만 안정성이 늘어난다.

## 강좌

- 2일차, 40:40
