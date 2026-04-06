# 📦 Module 01: 🧠 LLM Fundamentals
Status: ⬜ Pending
Tuần: 1-2 (10 ngày học)
Prerequisites: Không (bắt đầu từ đây)

## 🎯 Mục Tiêu Học Tập
Sau module này, bạn sẽ:
- [ ] Hiểu 12 từ khóa nền tảng AI và bức tranh tổng thể
- [ ] Nắm vững Context Window, Token, Hallucination — nền tảng trước khi viết prompt
- [ ] Viết được prompt chính xác với Zero-shot, Few-shot, Chain-of-Thought
- [ ] Ép AI trả về JSON theo schema với Zod và Function Calling
- [ ] Implement được streaming response (SSE) trên cả backend và frontend
- [ ] Biết chọn model phù hợp cho từng task (cost vs quality vs speed)

## 📅 Lịch Học Chi Tiết

---

### 🆕 Ngày 0: Warm-up — Bức Tranh Tổng Thể AI
📖 *Đọc bài overview + Ghi chú*
> 📌 **Nguồn:** Bài chia sẻ "12 từ khóa nền tảng AI" — anh Đức (CPP AI)
- [ ] Đọc `sources/duc-cppai.md` — bài overview 12 keywords
- [ ] Ghi chú: vẽ mindmap 12 keywords, nhóm theo chủ đề
- [ ] Đánh dấu: những keyword nào mình đã biết vs chưa biết
- [ ] Hiểu góc nhìn: "Người không biết" vs "Người biết" ở mỗi keyword
- **Từ khóa:** Context Window, Token, Model Types, Hallucination, Prompt Engineering, Temperature, RAG, Memory, Knowledge Graph, AI Agent, MCP, Fine-tuning

> 💡 **Mục tiêu ngày 0:** Có "bản đồ tổng thể" trước khi học chi tiết. Đây là nền tảng tư duy, không phải kỹ thuật.

---

### 🆕 Ngày 1: Context Window, Token & Hallucination
📖 *Đọc + Ghi chú (kiến thức nền tảng)*
> 📌 **Nguồn:** `sources/duc-cppai.md` (Keyword #1, #2, #4) + tìm hiểu thêm
- [ ] **Context Window:** Hiểu context length vs max output token. Ví dụ: Claude 200K, GPT-4o 128K, Gemini 2.5 Pro 1M
- [ ] **Token:** 1 token ≈ 0.75 từ tiếng Anh, tiếng Việt tốn 2-3x. Token quyết định chi phí
- [ ] **Hallucination:** AI bịa thông tin (số liệu, URL, trích dẫn). Nguyên nhân: dự đoán token xác suất cao nhất
- [ ] **Cách phòng hallucination:** Yêu cầu trích nguồn, bật web search, dùng RAG, system prompt "nói không biết nếu không chắc"
- [ ] Tự hỏi: "Token ảnh hưởng đến chi phí và thiết kế prompt như thế nào?"
- **Từ khóa:** Context Length, Max Output Token, Token, Tokenizer, Hallucination, Knowledge Cutoff

---

### Ngày 2: Prompt Engineering — Cơ bản
📖 *Đọc + Ghi chú*
- [ ] Đọc `docs/01-llm-fundamentals/01-prompt-engineering.md`
- [ ] Hiểu 4 kỹ thuật: Zero-shot, Few-shot, CoT, Role Prompting
- [ ] Đọc thêm về System Prompt từ `sources/duc-cppai.md` (Keyword #5)
- [ ] Ghi chú: Khi nào dùng kỹ thuật nào?
- **Từ khóa:** Zero-shot, Few-shot, Chain-of-Thought, Role Prompting, System Prompt

### Ngày 3: Prompt Engineering — Thực hành
🎯 *Deep Dive + Practice*
- [ ] Thực hành trên Gemini Advanced hoặc Google AI Studio
- [ ] Viết prompt phân loại email (Bài tập 1)
- [ ] Viết prompt trích xuất CV → JSON (Bài tập 2)
- [ ] Thử thay đổi Temperature: so sánh kết quả ở 0.2 vs 0.7 vs 1.0
- **Mục tiêu:** Viết được prompt có độ chính xác >90%

### Ngày 4: Structured Output — JSON Mode & Zod
📖 *Đọc + Code along*
- [ ] Đọc `docs/01-llm-fundamentals/02-structured-output.md`
- [ ] Hiểu JSON Mode vs Function Calling — khi nào dùng cái nào?
- [ ] Học Zod schema definition, Vercel AI SDK `generateObject`
- **Từ khóa:** JSON Mode, Function Calling, Zod, Schema, Validation

### Ngày 5: Structured Output — Thực hành
🎯 *Practice + Build*
- [ ] Parse văn bản giới thiệu → object Person (Bài tập 1)
- [ ] Trích xuất hóa đơn → Invoice schema (Bài tập 2)
- [ ] Chạy demo trong source code backend
- **Mục tiêu:** Build được API endpoint với structured output

### Ngày 6: Streaming & Real-time Response
📖 *Đọc + Ghi chú + Demo*
- [ ] Đọc `docs/01-llm-fundamentals/03-streaming.md`
- [ ] Hiểu SSE vs WebSocket — tại sao SSE đủ cho AI?
- [ ] Đọc code `streamText()` và `stream: true`
- [ ] Chạy demo streaming trong source code
- **Từ khóa:** Server-Sent Events, WebSocket, ReadableStream, AbortController

### Ngày 7: Model Selection & Comparison
📖 *Đọc + So sánh*
- [ ] Đọc `docs/01-llm-fundamentals/04-model-comparison.md`
- [ ] Nắm bảng so sánh: GPT-4 vs Claude vs Llama 3 (Cost/Quality/Speed)
- [ ] Đọc lại bảng phân tầng Flagship/Mid-tier/Light từ `sources/duc-cppai.md` (Keyword #3)
- [ ] Hiểu Model Router Pattern
- [ ] Hiểu Temperature chi tiết: 0-0.3 (chính xác) vs 0.4-0.7 (cân bằng) vs 0.8-1.0 (sáng tạo)
- **Từ khóa:** Trade-off, Token pricing, Model Router, Temperature, Flagship, Mid-tier, Light

### Ngày 8: Ôn tập Module 1 — Flashcards
🃏 *Flashcards + Feynman*
- [ ] Tạo flashcards cho 20-25 khái niệm chính (tăng từ 15 vì thêm nội dung)
- [ ] Feynman: "Context Window và Token ảnh hưởng đến cách dùng AI như thế nào?"
- [ ] Feynman: "Prompt Engineering là gì, tại sao cần?"
- [ ] Feynman: "Hallucination xảy ra vì đâu, và RAG giải quyết nó ra sao?"
- [ ] Ôn lại tất cả từ khóa tuần 1-2

### Ngày 9: Quiz Module 1
📝 *Quiz + Checkpoint*
- [ ] Quiz 12 câu: Context/Token, Hallucination, Prompt patterns, JSON Mode vs Function Calling, SSE vs WebSocket, Model trade-offs, Temperature
- [ ] Target: ≥ 70% đúng
- [ ] Review câu sai, đọc lại phần chưa hiểu

## ✅ Checklist Module
- [ ] Hiểu Context Window, Token, chi phí API
- [ ] Hiểu Hallucination và cách phòng tránh
- [ ] Hiểu 4 prompt patterns + System Prompt
- [ ] Build được API với structured output
- [ ] Hiểu streaming flow (backend → frontend)
- [ ] Biết chọn model cho từng use case + Temperature
- [ ] Đạt ≥70% quiz

---
➡️ Module tiếp: [Module 02: 📚 RAG & Knowledge Graph](./module-02-rag.md)
