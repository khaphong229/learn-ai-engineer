# 📅 Ngày 3: Structured Output + Streaming

> ⏱️ Thời lượng: **2 giờ**
> 📍 Giai đoạn: LLM Fundamentals (2/4)
> 🎯 Mục tiêu: Ép AI trả JSON + Streaming response real-time

---

## 📖 Phần 1: Lý Thuyết (40 phút)

### 1.1. Structured Output (20 phút)

**Đọc:** `docs/01-llm-fundamentals/02-structured-output.md`

**Vấn đề:** Code backend cần `JSON.parse()`, không thể parse đoạn văn tự do.

**2 cách ép AI trả JSON:**

| Cách | Mô tả | Ưu điểm | Nhược điểm |
|------|--------|---------|------------|
| **JSON Mode** | `response_format: { type: "json_object" }` | Đơn giản | Không đảm bảo đúng schema |
| **Function Calling** | Định nghĩa schema chặt chẽ | Type safety, validate | Phức tạp hơn |

**Schema definition với Zod (TypeScript):**

```typescript
import { z } from 'zod';

const PersonSchema = z.object({
  name: z.string(),
  age: z.number(),
  skills: z.array(z.string()),
});
// Zod validate output, ném lỗi nếu sai format
```

**Vercel AI SDK — `generateObject`:**
- Modern approach
- Built-in streaming support
- Tự động validate schema

### 1.2. Streaming (20 phút)

**Đọc:** `docs/01-llm-fundamentals/03-streaming.md`

**Vấn đề:** User không thể chờ 30s nhìn màn hình trống.
**Giải pháp:** Trả response từng phần (token-by-token) như ChatGPT.

| Phương thức | Hướng | Phức tạp | Use case |
|-------------|-------|----------|----------|
| **SSE** (Server-Sent Events) | One-way (server → client) | Đơn giản | Đủ cho 95% AI use cases |
| **WebSocket** | Two-way | Phức tạp | Real-time chat, game |

**Streaming với OpenAI:**
```typescript
const stream = await openai.chat.completions.create({
  model: 'gpt-4', messages: [...], stream: true,
});
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}
```

**Edge cases cần xử lý:**
- User hủy giữa chừng → `AbortController`
- Mất kết nối → Retry logic
- Timeout → Set thời gian giới hạn

---

## 💻 Phần 2: Thực Hành (60 phút)

### 2.1. Demo Structured Output (25 phút)

1. Mở FE → Bài **Structured Output**
2. Chạy demo: paste đoạn văn giới thiệu → xem AI trả về JSON
3. **Đọc code:** `backend/src/structured-output/`
   - Tìm comment `BUSINESS` — hiểu luồng xử lý
   - Xem cách định nghĩa Zod schema
   - Xem cách handle lỗi khi output không hợp lệ

**Bài tập:** Tự viết prompt trích xuất thông tin hóa đơn:
```json
{
  "invoice_number": "INV-001",
  "total": 1500000,
  "items": [
    { "name": "Laptop", "quantity": 1, "price": 1500000 }
  ],
  "date": "2026-06-28"
}
```

### 2.2. Demo Streaming (25 phút)

1. Mở FE → Bài **Streaming**
2. Chạy demo: gửi prompt → xem response hiện từng chữ
3. **Đọc code:**
   - **Backend:** `backend/src/streaming/` — xem cách tạo SSE endpoint
   - **Frontend:** Tìm component hiển thị streaming — xem cách nhận SSE

**Quan sát:**
- Response hiển thị real-time (không chờ hết mới hiện)
- Nút "Stop" hoạt động thế nào (AbortController)

### 2.3. Đọc API Docs (10 phút)

Mở `http://localhost:4000/api-docs` → Swagger UI:
- Tìm endpoint Structured Output
- Tìm endpoint Streaming
- Thử gọi API trực tiếp từ Swagger

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards (12 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| JSON Mode vs Function Calling? | JSON Mode: đơn giản, không đảm bảo schema. Function Calling: chặt chẽ, type safe |
| Zod dùng để làm gì? | Validate schema TypeScript, đảm bảo AI output đúng format |
| SSE vs WebSocket? | SSE: one-way, đơn giản, đủ cho AI. WebSocket: two-way, phức tạp |
| Streaming giải quyết gì? | UX: không để user chờ lâu, hiển thị response real-time |
| AbortController dùng khi nào? | Khi user click "Stop" → hủy stream giữa chừng |
| `stream: true` làm gì? | Bật streaming mode, server trả response từng chunk |
| generateObject (Vercel AI SDK)? | Tạo structured object từ LLM, built-in streaming + validation |
| Design pattern nào cho Streaming? | Observer (FE observe chunks), Iterator (iterate async stream) |

### Feynman (8 phút)

**Giải thích:** "Tại sao Structured Output quan trọng với developer?"

**Gợi ý:** Code cần parse data → JSON.parse() → cần AI trả đúng format → Zod validate → safe. Không thể parse đoạn văn tự do.

---

## ✅ Checklist Ngày 3

- [ ] Hiểu JSON Mode vs Function Calling
- [ ] Hiểu Zod schema validation
- [ ] Hiểu SSE vs WebSocket (tại sao SSE đủ cho AI)
- [ ] Chạy demo Structured Output trên FE
- [ ] Chạy demo Streaming trên FE
- [ ] Đọc code backend `structured-output/` và `streaming/`
- [ ] Hoàn thành bài tập trích xuất hóa đơn

---
➡️ Ngày tiếp: [Ngày 4: Model Selection + Ôn tập GĐ1](./day-04.md)
