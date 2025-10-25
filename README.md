# Directional Frontend Assignment

디렉셔널 프론트엔드 채용 과제

## 프로젝트 실행 방법

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드
```bash
npm run build
```

## 사용한 기술 스택

### Core
- **React** 19.2.0
- **TypeScript** 4.9.5

### Styling
- **Styled Components** 6.1.19

### Routing
- **React Router DOM** 7.9.4

### HTTP Client
- **Axios** 1.12.2

### Data Visualization
- **Chart.js** 4.5.1
- **react-chartjs-2** 5.3.0

## 프로젝트 구조

```
src/
├── api/              # API 클라이언트 및 API 호출 함수
├── components/       # 재사용 가능한 컴포넌트
├── hooks/           # 커스텀 훅
├── pages/           # 페이지 컴포넌트
├── styles/          # 글로벌 스타일
├── types/           # TypeScript 타입 정의
├── utils/           # 유틸리티 함수
├── App.tsx          # 앱 메인 컴포넌트
├── router.tsx       # 라우팅 설정
└── index.tsx        # 앱 엔트리 포인트
```

## 주요 구현 기능

### 1. 게시물 관리 (Posts)
- **게시물 목록 조회**
  - 페이지네이션 (10개씩)
  - 카테고리별 필터링 (tech, life, food)
  - 제목/내용 검색 기능
  - 정렬 기능 (생성일, 제목)
- **게시물 CRUD**
  - 생성(Create), 조회(Read), 수정(Update), 삭제(Delete)
  - Mock API 연동 (300개 게시물)

### 2. 데이터 시각화 (Charts)
- **다양한 차트 타입 지원**
  - 바 차트(Bar Chart)
  - 도넛 차트(Doughnut Chart)
  - 스택형 바 차트(Stacked Bar Chart)
  - 스택형 면적 차트(Stacked Area Chart)
  - 멀티라인 차트(Multi-line Chart)
- **차트 데이터**
  - 인기 커피 브랜드 통계
  - 주간 무드 트렌드 (Happy, Tired, Stressed)
  - 커피 소비량과 생산성/버그 수 관계 분석
- **안정적인 데이터 로딩**
  - Promise.allSettled를 활용한 개별 요청 처리
  - 자동 재시도 로직 (최대 3회, Exponential Backoff)
  - 부분 실패 시 성공한 차트만 표시

### 3. 인증 시스템 (Authentication)
- **로그인/로그아웃**
  - JWT 토큰 기반 인증
  - Axios Interceptor를 통한 자동 토큰 주입
  - 401 에러 시 자동 로그인 페이지 리다이렉트
- **인증 상태 관리**
  - LocalStorage를 통한 토큰 저장
  - 라우팅 보호 (Private Routes)

### 4. 기술적 특징
- **타입 안정성**
  - TypeScript를 활용한 타입 체크
  - API 응답 타입 정의 및 검증
- **코드 품질**
  - ESLint + Prettier를 통한 일관된 코드 스타일
  - Airbnb 스타일 가이드 준수
- **컴포넌트 설계**
  - Styled Components를 활용한 CSS-in-JS
  - Transient Props ($prefix)를 통한 깔끔한 DOM
  - 재사용 가능한 컴포넌트 구조
- **성능 최적화**
  - 병렬 API 요청 처리 (Promise.allSettled)
  - 클라이언트 사이드 필터링 및 정렬
  - 로딩 상태 및 에러 처리

## 주요 화면

### 1. Posts 페이지 (`/posts`)
- 게시물 목록 조회 (페이지네이션)
- 게시물 생성, 수정, 삭제
- 카테고리 필터 및 검색 기능

### 2. Charts 페이지 (`/charts`)
- 인기 커피 브랜드 (바 차트 / 도넛 차트)
- 주간 무드 트렌드 (스택형 바 차트 / 스택형 면적 차트)
- 커피 소비와 생산성 (멀티라인 차트)

### 3. Login 페이지 (`/login`)
- 사용자 인증
- JWT 토큰 발급 및 저장

### 4. My Page (`/mypage`)
- 사용자 작성 게시물 관리 (로그인 필요)

## 개발 시 주의사항

## API 문서

- **Swagger URL**: https://fe-hiring-rest-api.vercel.app/docs
- **Base URL**: https://fe-hiring-rest-api.vercel.app

## 배포 링크

TODO: 배포 후 추가

---

## 프로젝트 특이사항

### Styled Components Transient Props
DOM에 전달되지 않아야 하는 props는 `$` prefix를 사용:
```typescript
// ❌ Warning 발생
<Button active={true}>

// ✅ 올바른 사용
<Button $active={true}>
```

### API 재시도 로직
차트 데이터 로딩 시 자동 재시도 구현:
- 최대 3회 재시도
- 재시도 간격: 1초 → 2초 → 3초 (Exponential Backoff)
- 일부 실패 시에도 성공한 데이터는 표시

### Promise.allSettled 
- **Promise.allSettled**: 각 요청을 독립적으로 처리

---

**개발자**: Seokhyun Hong
**프로젝트 기간**: 2025.10.24-26
