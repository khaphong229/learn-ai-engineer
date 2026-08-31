# 📅 Ngày 4: Model Selection + Ôn Tập Giai Đoạn 1

> ⏱️ Thời lượng: **1.5 giờ**
> 📍 Giai đoạn: LLM Fundamentals (3/4) + Ôn tập
> 🎯 Mục tiêu: Chọn đúng model cho đúng task + Consolidate GĐ1

---

## 📖 Phần 1: Lý Thuyết (30 phút)

### 1.1. Model Comparison (20 phút)

**Đọc:** `docs/01-llm-fundamentals/04-model-comparison.md`
**Bổ sung:** `sources/duc-cppai.md` — Keyword #3 (Model)

**Bảng so sánh models phổ biến:**

| Model | Cost ($/1M tokens) | Strengths | Weaknesses |
|-------|-------------------|-----------|------------|
| GPT-4 | $30 in / $60 out | Reasoning, complex | Đắt, chậm |
| GPT-3.5-turbo | $1 in / $2 out | Nhanh, rẻ | Kém reasoning |
| Claude 3.5 Sonnet | $3 in / $15 out | Văn hay, coding, long context | Ít phổ biến |
| Llama 3 8B | Free (self-hosted) | Miễn phí, privacy | Cần GPU |

**Phân tầng (từ anh Đức):**
- **Flagship:** Claude Opus, GPT-4o — thông minh nhất, đắt nhất
- **Mid-tier:** Claude Sonnet, GPT-4o-mini — cân bằng chất lượng/chi phí
- **Light/Fast:** Claude Haiku, Gemini Flash — nhanh, rẻ, task đơn giản

**Model Router Pattern:**
```typescript
function selectModel(task: string): Model {
  if (isComplexReasoning(task)) return 'gpt-4';       // Đắt, chính xác
  if (isCodeGeneration(task)) return 'llama3-code';    // Free, code giỏi
  return 'gpt-3.5-turbo';                              // Default, rẻ, nhanh
}
```

### 1.2. Local Models Preview (10 phút)

- **Ollama:** Tool đơn giản nhất chạy LLM local (miễn phí, privacy 100%)
- **Yêu cầu:** 8GB VRAM cho model 7B, 16GB cho 13B
- **OpenAI-compatible API:** Code không cần thay đổi, chỉ đổi `baseURL`

---

## 💻 Phần 2: Thực Hành (40 phút)

### 2.1. Demo Model Comparison (20 phút)

1. Mở FE → Bài **Model Comparison**
2. Chạy demo: cùng 1 prompt, so sánh output của các models khác nhau
3. **Đọc code:** `backend/src/model-comparison/`
   - Xem cách gọi OpenRouter API với nhiều models
   - Xem cách so sánh cost/quality/speed

### 2.2. Ôn tập toàn bộ GĐ1 (20 phút)

**Vẽ diagram kết nối kiến thức GĐ1:**

```
User Input
    ↓
[Prompt Engineering] → Zero-shot/Few-shot/CoT/Role
    ↓
[Model Selection] → Chọn model phù hợp (cost/quality/speed)
    ↓
[Temperature] → Điều chỉnh sáng tạo vs chính xác
    ↓
[Structured Output] → Ép JSON theo schema (Zod)
    ↓
[Streaming] → Trả response real-time (SSE)
    ↓
AI Response (formatted, streamed)
```

**Quiz nhanh — tự kiểm tra 10 câu:**

1. Zero-shot khác Few-shot thế nào?
2. Temperature 0.1 phù hợp cho task gì?
3. JSON Mode vs Function Calling?
4. SSE khác WebSocket ở điểm nào?
5. Token tiếng Việt tốn hơn tiếng Anh bao nhiêu lần?
6. Hallucination xảy ra vì đâu?
7. Context Window 128K tokens nghĩa là gì?
8. Khi nào dùng GPT-3.5 thay GPT-4?
9. AbortController dùng để làm gì?
10. Model Router Pattern giải quyết vấn đề gì?

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards mới (10 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| Model Router Pattern? | Tự động chọn model dựa trên task: đơn giản → rẻ, phức tạp → đắt |
| GPT-4 vs GPT-3.5? | GPT-4: đắt gấp 15x, reasoning tốt hơn. GPT-3.5: nhanh, rẻ, đủ cho task đơn giản |
| Flagship vs Mid-tier vs Light? | Flagship: đắt nhất, giỏi nhất. Mid-tier: cân bằng. Light: nhanh rẻ |
| Ollama là gì? | Tool chạy LLM local miễn phí, API tương thích OpenAI |
| Trade-off khi chọn model? | Cost vs Quality vs Speed — không có model hoàn hảo |

### Feynman + Spaced Repetition (10 phút)

**Ôn lại flashcards Ngày 1-2** (spaced repetition)

**Feynman:** "Nếu bạn là CTO, bạn sẽ thiết kế hệ thống AI dùng model nào cho loại request nào?"

---

## ✅ Checklist Ngày 4

- [ ] Nắm bảng so sánh models (GPT-4 / GPT-3.5 / Claude / Llama)
- [ ] Hiểu 3 tầng model: Flagship / Mid-tier / Light
- [ ] Hiểu Model Router Pattern
- [ ] Chạy demo Model Comparison trên FE
- [ ] Vẽ được diagram kết nối GĐ1
- [ ] Tự quiz ≥ 7/10 câu đúng

---
➡️ Ngày tiếp: [Ngày 5: Embeddings + Vector Database](./day-05.md)
