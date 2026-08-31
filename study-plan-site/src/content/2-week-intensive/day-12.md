# 📅 Ngày 12: Error Handling + Retry + Circuit Breaker

> ⏱️ Thời lượng: **1.5 giờ**
> 📍 Giai đoạn: Production (3/3)
> 🎯 Mục tiêu: App không crash khi API lỗi — retry thông minh + fallback

---

## 📖 Phần 1: Lý Thuyết (35 phút)

### 1.1. Common LLM API Errors (5 phút)

**Đọc:** `docs/05-production/05-error-handling.md`

| Error | Nguyên nhân | Cách xử lý |
|-------|-----------|------------|
| **429 Too Many Requests** | Rate limit exceeded | Retry với backoff |
| **500 Internal Server Error** | LLM provider issue | Retry hoặc fallback |
| **Timeout** | Request quá lâu | Set timeout, retry |
| **Context Length Exceeded** | Prompt quá dài | Truncate/summarize |

### 1.2. Exponential Backoff with Jitter (10 phút)

**Ý tưởng:** Retry với thời gian chờ tăng dần + random để tránh "thundering herd".

```
Lần 1 fail → Chờ 1s + random(0-100ms) → Retry
Lần 2 fail → Chờ 2s + random(0-100ms) → Retry
Lần 3 fail → Chờ 4s + random(0-100ms) → Retry
Lần 4 fail → THROW ERROR (đã hết retries)
```

**Quan trọng:** Chỉ retry 429 và 5xx. KHÔNG retry 4xx (trừ 429) vì đó là lỗi client.

### 1.3. Fallback Models (5 phút)

Nếu GPT-4 fail → tự động chuyển sang Claude → nếu vẫn fail → GPT-3.5:

```typescript
const models = ['gpt-4', 'claude-3-5-sonnet', 'gpt-3.5-turbo'];
for (const model of models) {
  try { return await callLLM(model, messages); }
  catch { console.log(`${model} failed, trying next...`); }
}
throw new Error('All models failed');
```

### 1.4. Circuit Breaker Pattern (10 phút)

**Giống cầu dao điện:** Khi API fail liên tục → ngắt mạch, tránh gọi tiếp → chờ hồi phục.

```
CLOSED (bình thường)
    ↓ (5 failures liên tiếp)
OPEN (ngắt mạch — reject mọi request 5 phút)
    ↓ (sau 5 phút)
HALF_OPEN (thử 1 request)
    ↓ (thành công → CLOSED / fail → OPEN lại)
```

### 1.5. Graceful Degradation (5 phút)

Khi AI fail → fallback sang giải pháp đơn giản hơn:

```typescript
try {
  const answer = await llm.invoke(query);
  return { answer, source: 'ai' };
} catch {
  const results = await keywordSearch(query);  // Fallback
  return { answer: results[0]?.text || 'Sorry', source: 'fallback' };
}
```

---

## 💻 Phần 2: Thực Hành (40 phút)

### 2.1. Demo Error Handling (20 phút)

1. Mở FE → Bài **Error Handling**
2. Chạy demo: xem retry logic, circuit breaker hoạt động
3. **Đọc code:** `backend/src/error-handling/`
   - `retryWithBackoff()` — xem exponential backoff + jitter
   - `CircuitBreaker` class — xem state machine CLOSED/OPEN/HALF_OPEN
   - `chatWithFallback()` — xem fallback models chain

### 2.2. Phân tích code patterns (15 phút)

**Bài tập:** Đọc kỹ `CircuitBreaker` class:
1. Tìm `threshold` — bao nhiêu failures mới mở circuit?
2. Tìm `timeout` — bao lâu chờ trước khi thử lại?
3. Tìm `onSuccess()` / `onFailure()` — state transition logic

### 2.3. Ôn tập Production tổng hợp (5 phút)

**Production checklist cho AI app:**
```
□ Evaluation      → Golden Dataset + Metrics (Exact/Contains/Judge)
□ Observability   → LangSmith + Helicone + Custom Logger
□ Cost            → Token count + Caching + Model routing + Batch
□ Security        → Injection detection + PII + Moderation + Rate limit
□ Error Handling  → Retry + Fallback + Circuit Breaker + Timeout
```

---

## 📝 Phần 3: Củng Cố (15 phút)

### Flashcards (8 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| Exponential Backoff? | Retry với chờ tăng dần: 1s → 2s → 4s → 8s... Tránh spam server |
| Jitter? | Random thêm thời gian (0-100ms) → tránh thundering herd |
| Fallback Models? | GPT-4 fail → Claude → GPT-3.5. User không biết chuyện gì xảy ra |
| Circuit Breaker? | Ngắt mạch khi fail liên tục: CLOSED → OPEN → HALF_OPEN → CLOSED |
| Graceful Degradation? | AI fail → fallback keyword search. Vẫn trả response (dù kém hơn) |
| Retry 429 nhưng không retry 400? | 429 = rate limit (tạm thời). 400 = bad request (lỗi client, retry vô ích) |

### Feynman (7 phút)

**Giải thích:** "Khi OpenAI down 10 phút, làm sao user vẫn dùng được app?"

**Gợi ý:** Retry + Backoff (nếu tạm thời). Circuit Breaker (nếu kéo dài). Fallback Models (chuyển sang Claude). Graceful Degradation (dùng keyword search).

---

## ✅ Checklist Ngày 12

- [ ] Hiểu 4 loại lỗi LLM thường gặp
- [ ] Hiểu Exponential Backoff with Jitter
- [ ] Hiểu Fallback Models pattern
- [ ] Hiểu Circuit Breaker: CLOSED → OPEN → HALF_OPEN
- [ ] Chạy demo Error Handling trên FE
- [ ] Đọc code `error-handling/` module

---
➡️ Ngày tiếp: [Ngày 13: Multi-modal + Fine-tuning + Local Models](./day-13.md)
