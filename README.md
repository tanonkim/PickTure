# 🎨 PickTure - 디지털/실물 상품 통합 추천 판매 플랫폼

> Pick + Future = PickTure  
> 사용자의 취향을 반영하여 디지털/실물 상품을 추천하고, 다양한 에디션을 통해 수집의 재미를 제공합니다.

## 🧩 프로젝트 구조

<pre> pickture/ 
├── nest-backend-v1/ # Nest.js 기반 백엔드 
├── next-frontend-v1/ # Next.js 기반 프론트엔드 
└── README.md  </pre>

### 🌟 주요 기능

### 1. 디지털/실물 상품 판매

- 디지털 상품/실물 등급 시스템 (일반 / 희귀 / 레전더리 등)
- 실물 굿즈와 연계된 판매 시스템

### 2. 에디션 시스템

- 에디션별로 디지털 상품을 구성
- 특정 에디션에서 N개의 랜덤 디지털 아이템 발급
- 사용자는 발급된 상품 중 하나를 선택 수집 가능

### 3. AI 기반 상품 추천

- LLM을 활용한 취향 분석 및 상품 추천
- 상품 설명 자동 생성 (LLM 기반)

## 🛠️ 기술 스택

| 영역     | 기술                                     |
| -------- | ---------------------------------------- |
| Frontend | Next.js 15+, TypeScript, Tailwind CSS    |
| Backend  | Nest.js, Prisma, PostgreSQL              |
| 인프라   | Turborepo, Docker, Vercel (FE), EC2 (BE) |
| AI/LLM   | OpenAI API                               |

---
