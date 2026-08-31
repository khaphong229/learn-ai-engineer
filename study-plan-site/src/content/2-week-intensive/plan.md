# 🚀 Study Plan: AI Application Engineer — 2 Tuần Cấp Tốc

> Created: 2026-06-28
> Status: 🟡 In Progress
> Intensity: ⚡ Intensive (1-2 giờ/ngày × 14 ngày)

## Overview

Lộ trình học cấp tốc **14 ngày**, mỗi ngày **1-2 tiếng**, bao phủ toàn bộ 6 giai đoạn AI Application Engineer. Kết hợp lý thuyết + thực hành trực tiếp trên repo FE (Next.js) + BE (NestJS).

> ⚠️ **Lưu ý:** Plan này nén nội dung từ 46 ngày (30 phút/ngày) thành 14 ngày (1-2 giờ/ngày). Mỗi ngày sẽ học nhiều chủ đề hơn, nhưng nhờ thời lượng dài hơn nên vẫn đảm bảo chất lượng.

## Sources

| Nguồn | Mô tả | Đường dẫn |
|-------|--------|-----------|
| **Tài liệu chính** | Docs chi tiết 6 giai đoạn | `docs/00-overview` → `docs/06-advanced` |
| **Tài liệu bổ sung** | 12 từ khóa AI nền tảng (anh Đức, CPP AI) | `sources/duc-cppai.md` |
| **Source code Backend** | NestJS - 21 modules thực hành | `backend/src/` |
| **Source code Frontend** | Next.js - Giao diện học + demo | `frontend/src/` |
| **Project Ideas** | 4 ý tưởng dự án có guideline | `docs/project-ideas/` |

## Chuẩn Bị Trước Khi Học

- [ ] Cài đặt **Node.js** (nếu chưa có)
- [ ] Clone repo và cài dependencies: `pnpm i` trong cả `frontend/` và `backend/`
- [ ] Tạo file `.env` trong `backend/` dựa theo `.env.example`
- [ ] Đăng ký **OpenRouter API Key** (tối thiểu $2-5 để test) — [openrouter.ai](https://openrouter.ai)
- [ ] Đăng ký **TryChroma** (miễn phí, cho phần RAG) — [trychroma.com](https://www.trychroma.com)
- [ ] Chạy thử: `pnpm dev` (FE) + `pnpm start:dev` (BE) → Truy cập `localhost:3000` & `localhost:4000/api-docs`

## Tổng Quan 14 Ngày

| Ngày | Chủ đề | Giai đoạn | Thời lượng | File chi tiết |
|------|--------|-----------|------------|---------------|
| **1** | 🗺️ Tổng quan + Context/Token/Hallucination | Nền tảng | 1.5h | [day-01.md](./day-01.md) |
| **2** | ✍️ Prompt Engineering + Temperature | LLM Fundamentals | 1.5h | [day-02.md](./day-02.md) |
| **3** | 📦 Structured Output + Streaming | LLM Fundamentals | 2h | [day-03.md](./day-03.md) |
| **4** | 🤖 Model Selection + Ôn tập GĐ1 | LLM Fundamentals | 1.5h | [day-04.md](./day-04.md) |
| **5** | 🔢 Embeddings + Vector Database | RAG | 2h | [day-05.md](./day-05.md) |
| **6** | ✂️ Chunking Strategy + Pipeline + Knowledge Graph | RAG | 2h | [day-06.md](./day-06.md) |
| **7** | 🧠 Memory Management + Chains & Routing | Orchestration | 2h | [day-07.md](./day-07.md) |
| **8** | 🔧 Function Calling + ReAct Pattern | Agents | 2h | [day-08.md](./day-08.md) |
| **9** | 🔌 MCP + Ôn tập GĐ2-3-4 | Agents | 1.5h | [day-09.md](./day-09.md) |
| **10** | 📊 Evaluation + Observability | Production | 2h | [day-10.md](./day-10.md) |
| **11** | 💰 Cost Optimization + Security | Production | 2h | [day-11.md](./day-11.md) |
| **12** | 🛡️ Error Handling + Retry + Circuit Breaker | Production | 1.5h | [day-12.md](./day-12.md) |
| **13** | 🌐 Multi-modal + Fine-tuning + Local Models | Advanced | 2h | [day-13.md](./day-13.md) |
| **14** | 🏆 Tổng ôn + Project Planning + Final Quiz | Tổng kết | 2h | [day-14.md](./day-14.md) |

## Phương Pháp Học

Mỗi ngày được chia thành 3 phần:

| Phần | Hoạt động | Thời lượng |
|------|-----------|------------|
| 📖 **Lý thuyết** | Đọc docs + ghi chú từ khóa | 30-40 phút |
| 💻 **Thực hành** | Chạy demo trên FE/BE, đọc source code | 40-60 phút |
| 📝 **Củng cố** | Flashcards + tự giải thích (Feynman) | 15-20 phút |

## Cách Thực Hành Với Source Code

### Backend (NestJS)
Mỗi chủ đề có module riêng trong `backend/src/`. Tìm hàm thực thi demo bằng **mã Behind the Scenes** trên giao diện FE. Đọc comments có prefix:
- **`BUSINESS`**: Logic chính — **BẮT BUỘC đọc**
- **`FRONTEND`**: Logic hỗ trợ hiển thị — bỏ qua

### Frontend (Next.js)
Giao diện tại `localhost:3000`. Học theo flow:
1. Đọc lý thuyết từng bài trên giao diện
2. Chạy demo thực hành
3. Click "Behind the Scenes" → tìm code tương ứng trong BE

## Quick Commands

```
Bắt đầu ngày mới:  Mở file day-XX.md tương ứng
Chạy Frontend:     cd frontend && pnpm dev
Chạy Backend:      cd backend && pnpm start:dev
API Docs:           http://localhost:4000/api-docs
```

## Mục Tiêu Cuối Khóa

- [ ] Hiểu toàn bộ 6 giai đoạn AI Application Engineer
- [ ] Chạy thành công tất cả demo trong source code
- [ ] Đạt ≥ 80% Final Quiz ngày 14
- [ ] Chọn được 1 Project Idea và có roadmap build
- [ ] Nắm vững 12 từ khóa nền tảng AI
