# 📅 Ngày 10: Evaluation + Observability

> ⏱️ Thời lượng: **2 giờ**
> 📍 Giai đoạn: Production (1/3)
> 🎯 Mục tiêu: Test chất lượng AI + Monitor/Debug behavior

---

## 📖 Phần 1: Lý Thuyết (45 phút)

### 1.1. Evaluation — "Unit Test cho AI" (20 phút)

**Đọc:** `docs/05-production/01-evaluation.md`

**Vấn đề:** LLM output không deterministic — cùng prompt có thể cho kết quả khác nhau. `console.log` không đủ.

**Golden Dataset:** Bộ test cases với input + expected output:
```typescript
const goldenDataset = [
  { input: "Capital of France?", expected: "Paris", difficulty: "easy" },
  { input: "Explain quantum computing", expected: "...", difficulty: "hard" },
];
```

**3 Evaluation Metrics:**

| Metric | Mô tả | Khi nào dùng |
|--------|--------|-------------|
| **Exact Match** | `output === expected` | Factual QA, data extraction |
| **Contains** | Output chứa keywords cần thiết | Classification, summary |
| **LLM-as-a-Judge** | Dùng GPT-4 chấm điểm output (1-10) | Creative tasks, complex answers |

**Evaluation Pipeline:** Load dataset → Chạy LLM → So sánh actual vs expected → Aggregate (pass rate, avg score) → Alert nếu quality drop.

### 1.2. Observability — "Log suy nghĩ của AI" (25 phút)

**Đọc:** `docs/05-production/02-observability.md`

**Vấn đề:** AI là "black box" — khi AI trả lời sai, cần biết:
- Prompt gửi gì? Context gì?
- Tool gọi gì? Tham số ra sao?
- Response mất bao lâu? Tốn bao nhiêu tiền?

**3 Design Patterns trong module Observability:**

| Pattern | Vai trò | Ví dụ |
|---------|---------|-------|
| **Decorator** | Wrap LLM calls với logging | `LLMTracingInterceptor` tự động trace |
| **Observer** | Multiple services observe events | LangSmith + Helicone + Custom Logger cùng log |
| **Proxy** | Proxy client để track | `HeliconeService` proxy OpenAI requests |

**3 Công cụ Observability:**

| Tool | Chức năng | Free tier |
|------|-----------|-----------|
| **LangSmith** | Tracing + Evals (tự động khi dùng LangChain) | ✅ |
| **Helicone** | Cost tracking theo user/endpoint | ✅ |
| **Custom Logger** | In-memory logs + stats API | Built-in |

**3 cách sử dụng trong code:**
1. **Tự động:** Interceptor (`@UseInterceptors(LLMTracingInterceptor)`)
2. **Manual:** `observabilityService.logLLMCallFromResponse()`
3. **Helicone proxy:** `heliconeService.createOpenAIClient(userId)`

---

## 💻 Phần 2: Thực Hành (55 phút)

### 2.1. Demo Evaluation (20 phút)

1. Mở FE → Bài **Evaluation**
2. Chạy demo: xem evaluation pipeline chạy test cases
3. **Đọc code:** `backend/src/evaluation/`
   - Xem Golden Dataset format
   - Xem 3 metric implementations: ExactMatch, Contains, LlmJudge
   - Xem evaluation pipeline: validate → evaluate → aggregate → return

### 2.2. Demo Observability (25 phút)

1. Mở FE → Bài **Observability**
2. Chạy demo: gọi LLM → xem logs + stats
3. **Đọc code:** `backend/src/observability/`
   - `services/custom-logger.service.ts` — xem logging logic
   - `services/helicone.service.ts` — xem proxy OpenAI
   - `observability.service.ts` — xem orchestrator
   - `interceptors/llm-tracing.interceptor.ts` — xem auto-trace

4. **Thử API:**
   ```bash
   # Xem stats
   curl http://localhost:4000/api/v1/observability/stats
   
   # Query logs
   curl http://localhost:4000/api/v1/observability/logs
   ```

### 2.3. Kết nối kiến thức (10 phút)

**Production monitoring loop:**
```
Develop → Deploy → Monitor (Observability) → Evaluate (Evals)
    ↑                                              ↓
    └──────── Fix prompt/model ←── Quality Drop ───┘
```

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards (12 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| Golden Dataset? | Bộ test cases (input + expected output) chuẩn để đo chất lượng AI |
| LLM-as-a-Judge? | Dùng GPT-4 chấm điểm output model nhỏ hơn theo rubric (1-10) |
| 3 eval metrics? | Exact Match (chính xác), Contains (keyword), LLM-as-Judge (chấm điểm) |
| Observability cần vì? | AI = black box. Cần xem prompt, context, tool calls, cost, latency để debug |
| Decorator Pattern (Observability)? | Wrap LLM calls với logging interceptor — tự động trace |
| Helicone dùng để? | Proxy OpenAI requests → track cost theo user/endpoint |
| LangSmith? | Tracing + Evals platform, tự động khi dùng LangChain |
| Observability Service? | Orchestrator điều phối LangSmith + Helicone + Custom Logger |

### Feynman (8 phút)

**Giải thích:** "Làm sao biết AI app của bạn đang hoạt động tốt hay không?"

---

## ✅ Checklist Ngày 10

- [ ] Hiểu Golden Dataset và 3 evaluation metrics
- [ ] Hiểu kiến trúc Observability module (3 patterns)
- [ ] Biết 3 tools: LangSmith, Helicone, Custom Logger
- [ ] Chạy demo Evaluation + Observability trên FE
- [ ] Đọc code `evaluation/` và `observability/`
- [ ] Thử query API stats/logs

---
➡️ Ngày tiếp: [Ngày 11: Cost Optimization + Security](./day-11.md)
