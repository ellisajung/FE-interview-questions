# 질문
프론트엔드 애플리케이션에서 State Management를 다룰 때, 전역 상태와 지역 상태를 나눠 관리하는 기준은 무엇인가요?

# 질문의도
전역 상태와 지역 상태의 차이점 및 구분 기준(컴포넌트 간 공유 필요성, 변화 빈도 등)을 이해하고 있는지 확인합니다.

# 답변
전역 상태와 지역 상태는 컴포넌트 간 공유 필요성, 변화 빈도 기준으로 나눌 수 있습니다.

**컴포넌트 간 공유 여부** → 하나의 컴포넌트에서만 사용되면 지역 상태, 여러 컴포넌트가 필요하면 전역 상태
**변경 빈도** → *자주 변경되는 데이터*는 지역 상태로 관리하는 것이 성능에 유리
**앱 전반적인 영향도** → 페이지가 바뀌어도 유지해야 한다면 전역 상태

예를 들어, 로그인 상태(user 객체)는 여러 곳에서 필요하므로 전역 상태로 관리하고, 검색 필터 값은 특정 페이지에서만 사용되므로 지역 상태가 적절합니다.
가능하면 지역 상태로 관리하고, 꼭 필요한 경우에만 전역 상태를 활용하는 것이 성능과 유지보수 측면에서 유리합니다.

# 관련 개념
*변경이 자주 발생하는 데이터*라도 여러 컴포넌트에서 공유해야 한다면 전역 상태로 관리해야 합니다.
다만, 전역 상태가 자주 변경되면 불필요한 리렌더링이 발생할 수 있으므로 적절한 *최적화*가 필요합니다.

예를 들어,
    1) **컨텍스트 분리**: 필요한 범위만 영향을 받도록 전역 상태를 세분화
    2) **선택적 구독**: Zustand의 selector, Redux의 useSelector() 등을 활용해 특정 데이터만 감지
    3) **비동기 데이터 캐싱**: React Query 같은 라이브러리를 활용하여 네트워크 요청 데이터를 효율적으로 관리


1. 컨텍스트 분리 (Scoped Context)
전역 상태를 하나의 거대한 컨텍스트로 관리하면 모든 상태 변경 시 불필요한 리렌더링이 발생할 수 있어요.
따라서 기능별로 컨텍스트를 분리하면 필요한 부분에서만 상태를 감지할 수 있습니다.

- 예제: 테마 & 사용자 정보 컨텍스트 분리
    ```tsx
    const ThemeContext = createContext(); // 테마 설정 컨텍스트
    const UserContext = createContext(); // 사용자 정보 컨텍스트

    export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
        </ThemeContext.Provider>
    );
    };

    export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );
    };
    ```

이점:
- 테마 관련 상태가 변경되어도 사용자 정보 관련 컴포넌트는 리렌더링되지 않음
- 불필요한 상태 공유를 줄이고, 필요한 곳에서만 상태를 사용할 수 있음


2. 선택적 구독 (Selective Subscription)
전역 상태에서 필요한 데이터만 구독하면 불필요한 리렌더링을 방지할 수 있어요.

- 예제: Zustand의 Selector 활용하여, Zustand에서 전체 상태를 구독하는 대신, 특정 데이터만 선택해서 가져올 수 있습니다.
    ```tsx
    import create from "zustand";

    const useStore = create((set) => ({
    user: { name: "Elisa", age: 25 },
    theme: "light",
    setTheme: (theme) => set({ theme }),
    }));

    const UserName = () => {
    const userName = useStore((state) => state.user.name); // user.name만 구독
    console.log("UserName 컴포넌트 렌더링");
    return <p>Username: {userName}</p>;
    };
    ```

이점:
- user.name이 바뀌지 않는 한 UserName 컴포넌트는 리렌더링되지 않음
- Zustand, Redux의 useSelector() 등을 활용하면 같은 원리로 최적화 가능


3. 비동기 데이터 캐싱 (Async Data Caching)
네트워크 요청 데이터를 전역 상태로 관리하면 매번 API 요청 시 불필요한 리렌더링이 발생할 수 있어요.
React Query 같은 라이브러리를 활용하면 자동으로 데이터를 캐싱하고 필요할 때만 업데이트할 수 있습니다.

- 예제: React Query 활용
```tsx
import { useQuery } from "@tanstack/react-query";

const fetchUser = async () => {
  const res = await fetch("/api/user");
  return res.json();
};

const UserProfile = () => {
  const { data: user, isLoading } = useQuery(["user"], fetchUser, {
    staleTime: 1000 * 60 * 5, // 5분간 캐싱 유지
  });

  if (isLoading) return <p>Loading...</p>;
  return <p>{user.name}</p>;
};
```

이점:
- 데이터를 로컬 상태가 아닌 캐시에서 불러오기 때문에 불필요한 API 요청을 방지
- staleTime을 활용하면 일정 시간 동안 캐시를 유지하여 성능 최적화


https://velog.io/@ojj1123/zustand-and-react-context
https://laurent.tistory.com/entry/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%EC%83%9D%EB%AA%85-%EC%A3%BC%EA%B8%B0Life-Cycle








