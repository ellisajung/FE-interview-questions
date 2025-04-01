# 질문
프론트엔드에서 이미지 최적화가 중요한 이유를 설명하고, 성능 최적화를 위해 사용할 수 있는 3가지 방법을 제시해주세요. 

# 질문의도
이미지 최적화가 사용자 경험(로딩 속도, 데이터 사용량)에 미치는 영향을 이해하고 있는지 확인합니다. 주요 최적화 방법(이미지 포맷 변경(WebP), 지연 로딩(Lazy Loading), Responsive Images) 등을 알고 있는지 평가합니다.

# 답변
이미지는 웹 페이지에서 가장 용량이 큰 자원 중 하나로, 최적화하지 않으면 페이지 로딩 속도, 사용자 경험, 그리고 SEO(검색 엔진 최적화)에 부정적인 영향을 미칠 수 있기 때문에 최적화가 중요합니다.

이미지 최적화 방법에는 크게 이미지 사이즈 감소(이미지 압축 및 포맷 변환), 이미지 lazy loading, 반응형 이미지가 있습니다.

### 이미지 사이즈 최적화(사이즈 줄이기, 이미지 압축 및 포맷 변환)

~~#### 이미지 실제 사이즈 줄이기 
일반적으로 실제 이미지 사이즈는 렌더링 사이즈의 2배 정도인 것이 권장().
줄이는 방법은 이미지를 어디서 가져오냐에 따라 다름.
정적 이미지일 경우, 편집 툴을 사용하여 직접 줄이면 됨
API를 통해 가져올 경우, Cloudinary나 Imagix와 같은 CDN 사용.~~

#### 이미지 압축 및 포맷 변환*
상황에 따라 다르겠지만(지원 브라우저, 화질이 중요한 이미지인지 등), 일반적으로 압축 효율이 높은 *WebP* 또는 *AVIF* 포맷을 사용하여 사이즈를 최적화할 수 있습니다.

### lazy loading

최대한 사용자가 보이는 부분부터 로드되도록 처리하고, 보이지 않는 부분은 **lazy loading**을 적용하여 초기 페이지 로딩 속도를 개선할 수 있습니다. lazy loading을 적용하는 방법은 `<img>`요소에 *loading 속성*을 추가하여 사용자가 가까이 스크롤할 때까지 지연시키도록 브라우저에 지시하거나, *Intersection Observer* Web API를 사용하여 동적으로 로딩을 처리할 수 있습니다.

### 반응형 이미지
브레이크 포인트에 따른 이미지 크기를 설정해 사용자가 필요 이상의 이미지를 다운받아 리소스가 낭비되는 일을 줄일 수 있습니다.

### (참고) 이미지 CDN 사용
CDN(Content Delivery Network)을 활용하면 전 세계 여러 서버에서 캐싱된 이미지를 제공하여 서버 응답 시간을 줄이고(서버 부하 분산), 트래픽 부하를 분산할 수 있습니다. 사용자의 위치에 가까운 CDN 엣지 서버에서 이미지를 제공하므로, 지연(latency)이 감소하고 로딩 속도가 빨라집니다(지리적 최적화).



# 관련 개념

### 개념 1

1. 이미지 종류 및 특성
    브라우저에서 어떻게 렌더링 되느냐에 따라, 비트맵(bitmap)/레스터(raster) vs 벡터(vector) 이미지로 나뉨

    1) **비트맵 / 레스터 이미지**:
    - 픽셀에 표현하고자 하는 색상을 그려서 이미지 형태로 표현하는 방식
    - 사이즈가 커질수록 그만큼의 정보를 담은 픽셀들을 추가해야하기 때문에 이미지의 요량도 늘어나고 렌더링 속도도 현저히 떨어지게 됨
    - ex) JPEG, PNG, GIF, WebP, AVIF

        1-1) 이미지의 손실을 어느 정도 허용하는지에 따라: 무손실 vs 손실 이미지
            ① **무손실 이미지** (≠ 원본 이미지):
                - 이미지를 렌더링하는 데 필요하지 않은 정보들을 제거한 이미지
                - ex) PNG, GIF
            ② **손실 이미지**:
                - 무손실 이미지의 화질 저하를 감수하면서 사이즈를 줄인 이미지 -> 상대적으로 빠른 렌더링
                - 일반적으로 사람이 품질 저하를 거의 눈치채지 못하면서 품질을 낮출 수 있는 퍼센트는 100~75% 
                - 실제로 구글 이미지의 썸네일은 76~74% 정도의 손실 이미지를 사용하고, 페이스북 이미지는 85%의 손실 이미지 사용
                - ex) JPEG

    2) **벡터 이미지**:
        - 픽셀값이 아닌 선의 표현, 크기, 색상 등의 정보를 수학 방정식 데이터 형태로 포함하고 있는 이미지,
            컴퓨터가 이를 연산하여 이미지 제공
        - 사이즈가 커지거나 작아져도 이미지가 깨지거나 정보가 달라지지 않음
        - 단, 이미지가 복잡할수록 수학적인 정보가 늘어나, 이미지 용량 또한 늘어남
        - ex) SVG

2. WebP & AVIF 포맷
    - 장점:
        - 둘 다 무손실 & 손실 전부 지원하여, 상용 이미지 포맷 대체 가능
        - JPEG 대비 압축효율 WebP가 30%, AVIF가 50% 정도 (Next.js에서는 AVIF 지원)
    - 단점:
        - WebP는 디바이스 사양에 따라 더 높은 리소스를 필요로 할 수도 있음
        - AVIF는 단순한 패턴의 이미지를 압축하는 경우 PNG보다 낮은 압축률을 보여질 때도 있음. 또한, 최신 포맷(2017)으로 브라우저 지원률 낮음.

3. 정리표

    ||GIF|PNG|JPEG|WebP|AVIF|
    |---|---|---|---|---|---|
    |압축률|보통|보통|높음|매우 높음|매우 높음|
    |압축방식|무손실|무손실|손실|손실/무손실|손실/무손실|
    |지원브라우저|모든 브라우저|모든 브라우저|모든 브라우저|IE 제외 모든 브라우저|지원률 낮음|


### 개념 2


1. loading 속성
    ```html
    <img src="image.jpg" alt="Example" loading="lazy" />
    ```

2. Intersection Observer
    ```jsx
    /* 
    Intersection Observer

    - loading 속성이 있는데 왜?
        1) options 파람으로 세부 설정 가능
        2) <img> 태그가 아닌 background-image 등에 적용하고 싶을 때
        3) fade-in과 같은 애니메이션 효과를 추가하고 싶을 때

    - Syntax:
        new IntersectionObserver(callback)
        new IntersectionObserver(callback, options)

    */ 

    // react 예제
    import { useState, useEffect, useRef } from "react";

    const LazyImage = ({ src, alt }) => { // 커스텀 훅 또는 유틸 함수로 만들어 사용 가능
      const [isLoaded, setIsLoaded] = useState(false);
      const imgRef = useRef(null);

      useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { // 1.IntersectionObserver 객체 생성 & callback, options 정의
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect(); // Intersection Observer를 해제
          }
        });
        observer.observe(imgRef.current); // 2. 생성한 인스턴스의 observe 메서드에 관찰할 요소 파람으로 전달
        return () => observer.disconnect(); // Intersection Observer를 해제
      }, []);

      return (
        <img 
            ref={imgRef} 
            src={isLoaded ? src : ""} 
            alt={alt}  
            style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s" }} // fade-in 효과
        />; 
      )
    };

    // vanilla js 예제
    const options = {
        root: null, // 대상 객체의 조상 요소 또는 가장 상위에 위치하는 viewport 요소(디폴트)
        rootMargin: '0px', // root의 가시 범위를 가상으로 확장하거나 축소 가능
        threshold: 1.0 // 가시성 퍼센티지 (디폴트 0). 예를 들어, 0.1일 경우, 대상 요소가 최소 10% 보일 때마다 콜백함수 호출
    }

    // 가시성이 변경될 때마다 실행되는 함수
    const callback = (entries, observer) => { // entries: 가시성이 변한 요소들로 이루어진 배열
        console.log('entries', entries) // 실행할 로직
    }

    const observer = new IntersectionObserver(callback, options)

    observer.observe(document.querySelector('#target-element1'))

    ```

3. Responsive Image
    ```jsx
    // Next.js Image 컴포넌트 예제

    <Image 
    src="/example.jpg"
    alt="Example"
    width={800}
    height={600}
    sizes="(max-width: 600px) 480px, (max-width: 1200px) 1024px, 800px"
    />

    // 화면 너비가 600px 이하일 때는 480px 너비 이미지를 사용.
    // 화면 너비가 1200px 이하일 때는 1024px 너비 이미지를 사용.
    // 그 외의 경우 800px 너비 이미지를 사용.

    ```  