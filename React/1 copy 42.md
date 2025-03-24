# 문제
React에서 Strict Mode가 useEffect의 실행에 미치는 영향을 설명하고 이를 처리하는 방법을 설명해주세요.

# 질문의도
React의 Strict Mode가 개발 모드에서만 동작하며, useEffect 내부의 코드를 두 번 실행하는 이유(초기 마운트 시의 부작용 감지)를 설명할 수 있는지 확인합니다. 또한 useEffect 내부에서 불필요한 API 호출, 비효율적인 상태 업데이트 등의 문제를 방지하는 방법(예: useRef로 상태 추적, useEffect 의존성 배열 관리)을 설명할 수 있는지를 판단합니다.

# 답변