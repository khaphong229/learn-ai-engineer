# 📦 Module 04: 🚀 Production & LLMOps
Status: ⬜ Pending
Tuần: 6-7 (9 ngày học)
Prerequisites: Module 03 (Orchestration, Agents & MCP)

## 🎯 Mục Tiêu Học Tập
Sau module này, bạn sẽ:
- [ ] Tạo được Golden Dataset và chạy evaluation tự động
- [ ] Setup được tracing & observability (LangSmith/Helicone)
- [ ] Tối ưu được chi phí LLM (caching, model routing, batch)
- [ ] Bảo vệ app khỏi prompt injection và data leakage
- [ ] Implement được retry, fallback, circuit breaker

## 📅 Lịch Học Chi Tiết

### Ngày 27: Evaluation (Evals)
📖 *Đọc + Code along*
- [ ] Đọc `docs/05-production/01-evaluation.md`
- [ ] Hiểu tại sao cần Evals: LLM output không deterministic
- [ ] Học 3 metrics: Exact Match, Contains, LLM-as-a-Judge
- [ ] Tạo Golden Dataset 10+ examples
- **Từ khóa:** Golden Dataset, Exact Match, LLM-as-a-Judge, Rubric, Regression

### Ngày 28: Observability — Phần 1 (bài nặng nhất)
📖 *Đọc + Phân tích kiến trúc*
- [ ] Đọc `docs/05-production/02-observability.md` (phần 1-5)
- [ ] Hiểu kiến trúc module: 3 patterns (Decorator, Observer, Proxy)
- [ ] Hiểu LangSmith setup và Helicone cost tracking
- [ ] Hiểu Custom Logger Service
- **Từ khóa:** Tracing, LangSmith, Helicone, Decorator Pattern, Proxy Pattern

### Ngày 29: Observability — Phần 2
📖 *Đọc tiếp + Demo*
- [ ] Đọc phần 6-10: Interceptor, Orchestrator, API, Config, Usage
- [ ] Hiểu 3 options sử dụng: Auto Interceptor, Manual logging, Helicone client
- [ ] Chạy demo observability trong source code
- **Mục tiêu:** Hiểu full flow từ LLM call → log → dashboard

### Ngày 30: Cost Optimization
📖 *Đọc + Thực hành*
- [ ] Đọc `docs/05-production/03-cost-optimization.md`
- [ ] Học Token Counting với tiktoken, luôn set `max_tokens`
- [ ] Hiểu Prompt Caching (Claude) và Semantic Caching (Redis)
- [ ] Hiểu Batch Processing (50% discount!)
- [ ] Hiểu Cost Monitoring và alerting
- **Từ khóa:** tiktoken, max_tokens, Prompt Caching, Semantic Caching, Batch API

### Ngày 31: Security & Safety
📖 *Đọc + Code along*
- [ ] Đọc `docs/05-production/04-security.md`
- [ ] Implement Prompt Injection Detection (regex patterns)
- [ ] Hiểu NeMo Guardrails, PII Detection (Presidio)
- [ ] Hiểu Content Moderation (OpenAI API) và Rate Limiting
- [ ] Hiểu System Prompt Protection: ❌ Bad vs ✅ Good
- **Từ khóa:** Prompt Injection, PII, NeMo Guardrails, Content Moderation, Rate Limit

### Ngày 32: Error Handling & Retry — Phần 1
📖 *Đọc + Code along*
- [ ] Đọc `docs/05-production/05-error-handling.md` (phần 1-4)
- [ ] Nắm 4 loại lỗi thường gặp: 429, 500, Timeout, Context Length
- [ ] Implement Exponential Backoff with Jitter
- [ ] Implement Fallback Models (GPT-4 → Claude → GPT-3.5)
- **Từ khóa:** Exponential Backoff, Jitter, Fallback, p-retry

### Ngày 33: Error Handling — Phần 2 + Ôn tập
📖🃏 *Đọc tiếp + Flashcards*
- [ ] Đọc phần 5-7: Circuit Breaker, Timeout, Graceful Degradation
- [ ] Implement Circuit Breaker: CLOSED → OPEN → HALF_OPEN
- [ ] Tạo flashcards 20 khái niệm Production
- **Từ khóa:** Circuit Breaker, Timeout, Graceful Degradation, AbortController

### Ngày 34: Ôn tập + Spaced Repetition
🃏🔁 *Ôn tập tổng Module 1-4*
- [ ] Ôn flashcards Module 1, 2, 3 (Spaced Repetition)
- [ ] Feynman: "Production-ready AI app cần gì khác so với prototype?"
- [ ] Ghi lại 3 bài học quan trọng nhất từ Module 4

### Ngày 35: Quiz Module 4
📝 *Quiz + Checkpoint*
- [ ] Quiz 12 câu: Evals, Observability, Cost, Security, Error Handling
- [ ] Target: ≥ 70%
- [ ] Review câu sai

## ✅ Checklist Module
- [ ] Tạo và chạy được evaluation pipeline
- [ ] Hiểu kiến trúc observability
- [ ] Biết 3+ kỹ thuật giảm cost
- [ ] Implement được prompt injection detection
- [ ] Implement được retry + fallback + circuit breaker
- [ ] Đạt ≥70% quiz

---
➡️ Module tiếp: [Module 05: ⚡ Advanced](./module-05-advanced.md)
