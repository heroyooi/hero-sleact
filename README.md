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

```ts (hooks/useInput.ts)
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

### 비동기 요청

```command
npm i axios
```

```ts (pages/SignUp/index.tsx)
const onSubmit = useCallback(
  (e) => {
    e.preventDefault();
    if (!mismatchError && nickname) {
      console.log("서버로 회원가입하기");
      setSignUpError("");
      setSignUpSuccess(false);
      axios
        .post("http://localhost:3095/api/users", {
          email,
          nickname,
          password,
        })
        .then((response) => {
          console.log(response);
          setSignUpSuccess(true);
        })
        .catch((error) => {
          console.error(error.response);
          setSignUpError(error.response.data);
        })
        .finally(() => {});
    }
  },
  [email, nickname, password, passwordCheck]
);
```

### SWR

```command
npm i swr
```

```ts (pages/LogIn/index.tsx)
const fetcher = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((response) => response.data);

const { data, error } = useSWR("http://localhost:3095/api/users", fetcher);
const onSubmit = useCallback(
  (e) => {
    e.preventDefault();
    setLogInError(false);
    axios
      .post(
        "http://localhost:3095/api/users/login",
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then(() => {})
      .catch((error) => {
        setLogInError(error.response?.data?.statusCode === 401);
      });
  },
  [email, password]
);
```

- data 는 fetcher 함수의 response.data 가 된다.
- data 가 존재하지 않으면 로딩중
- LogIn 컴포넌트가 실행되자마자 서버로 한 번 요청을 보낸다. 그리고 swr 설정에 따라서 주기적으로 요청을 보내게 된다.
- axios 비동기 요청을 보낼 때 withCredentials 설정을 해줘야 프론트 서버와 백엔드 서버간의 쿠키가 잘 생성되고 전달될 수 있다. get 요청에선 2번째 자리, post 요청에선 3번째 자리가 설정 자리이다.

- 쿠키?

  - 쿠키는 백엔드에서 생성해서 브라우저가 기억하게끔 만들어준다.
  - 프론트엔드에서는 한번 기억한 쿠키를 매 요청마다 백엔드로 보내준다.
  - 생성은 백엔드가 하고, 보내는 것은 프론트엔드가 한다.

- CORS 문제는 브라우저에서 생기는 것이다.

#### swr - mutate

```ts
import useSWR from "swr";

const LogIn = () => {
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          "http://localhost:3095/api/users/login",
          { email, password },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          mutate(response.data, true); // OPTIMISTIC UI
        });
    },
    [email, password]
  );
};
```

- 기본적으로 mutate는 서버 요청 없이 데이터 바꾼 다음에, 서버의 점검을 통해서 최종 상태를 데이터에 반영한다.(Default, shouldRevalidate: true) - OPTIMISTIC UI
- mutate의 두번째 인자값을 false로 설정하면 서버에 요청을 보내지 않는다.
- 요청은 왠만하면 99% 이상 성공하니, 사용자에게 더 좋은 UX를 제공하기 위해서 OPTIMISTIC UI를 제공한다.

```ts
const { data } = useSWR("hello", (key) => {
  localStorage.setItem("data", key);
  return localStorage.getItem("data");
});
```

- swr은 비동기 요청에만 사용하는 것이 아니다. fetcher를 어떻게 구성하느냐에 따라서 다양한 방법으로 사용할 수 있다.

#### swr - options

- [SWR - Options](https://swr.vercel.app/docs/options)
- dedupingInterval: 캐시의 유지 기간
  - 캐시의 유지 기간 내에 아무리 요청을 많이 보내봤자, 처음 성공 데이터만 그대로 가져오고 나머지 요청은 무시한다. 유지 기간이 길수록 서버에 무리가 갈 걱정이 없다.

## 3일차

```command
npm i gravatar @types/gravatar
```

```command
npm i react-toastify
```

## 강좌

- 4일차
