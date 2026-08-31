# 📅 Ngày 1: Tổng Quan + Context/Token/Hallucination

> ⏱️ Thời lượng: **1.5 giờ**
> 📍 Giai đoạn: Nền tảng
> 🎯 Mục tiêu: Hiểu bức tranh tổng thể AI Application Engineer + 3 khái niệm nền tảng

---

## 📖 Phần 1: Lý Thuyết (40 phút)

### 1.1. Bức tranh tổng thể (20 phút)

**Đọc:** `sources/duc-cppai.md` — Bài chia sẻ "12 từ khóa AI nền tảng"

Ghi nhớ 12 keywords và nhóm theo chủ đề:

| Nhóm | Keywords |
|------|----------|
| **Hiểu AI** | Context Window, Token, Model, Temperature, Hallucination |
| **Kỹ thuật** | Prompt Engineering, RAG, Memory, Knowledge Graph |
| **Nâng cao** | AI Agent, MCP, Fine-tuning |

**Bài tập:** Vẽ mindmap 12 keywords trên giấy, đánh dấu keywords nào bạn đã biết vs chưa biết.

### 1.2. Kiến trúc AI Application (10 phút)

**Đọc:** `docs/00-overview/00-overview.md` (phần đầu)

Nắm 5 thành phần cốt lõi:

```
🧠 Bộ não (The Brain)           → LLM (GPT-4, Claude, Llama...)
📦 Bộ nhớ dài hạn              → Vector Database (RAG)
💬 Bộ nhớ ngắn hạn             → Quản lý Context hội thoại
🖐️ Tay chân (Tools/Actions)    → API, web search, database (Agents)
🔗 Dây thần kinh               → Orchestration framework
```

### 1.3. Context Window & Token (10 phút)

**Đọc:** `sources/duc-cppai.md` — Keyword #1, #2

**Kiến thức cần nắm:**

| Concept | Giải thích | Ví dụ |
|---------|-----------|-------|
| **Context Window** | Giới hạn tối đa thông tin AI đọc được trong 1 lần | Claude: 200K tokens, GPT-4o: 128K, Gemini: 1M |
| **Max Output Token** | Giới hạn số token AI được phép trả lời | Model 200K context nhưng max output chỉ 16K |
| **Token** | Đơn vị nhỏ nhất AI xử lý (≈0.75 từ tiếng Anh) | Tiếng Việt tốn 2-3x: "Xin chào" ≈ 3-4 tokens |
| **Token = Tiền** | Input tokens + Output tokens = Chi phí API | GPT-4: $30/1M input tokens |

**Quy tắc vàng:**
- Prompt ngắn gọn, chỉ đưa thông tin cần thiết
- Luôn set `max_tokens` để kiểm soát chi phí
- Chọn model rẻ cho task đơn giản, model đắt cho task phức tạp

### 1.4. Hallucination (10 phút)

**Đọc:** `sources/duc-cppai.md` — Keyword #4

**Hallucination là gì?** AI bịa thông tin nghe rất thuyết phục nhưng hoàn toàn sai. Nguyên nhân: LLM dự đoán token xác suất cao nhất, khi không có đủ dữ liệu vẫn tạo câu trả lời trôi chảy.

**5 dạng phổ biến:**
1. Bịa số liệu thống kê
2. Bịa URL (link không tồn tại)
3. Bịa tên sách/tác giả
4. Bịa trích dẫn nghiên cứu
5. Tự tin khẳng định điều sai

**4 cách phòng tránh:**
1. Yêu cầu AI trích dẫn nguồn
2. Bật tính năng web search
3. Dùng RAG (AI trả lời dựa trên dữ liệu của bạn)
4. System prompt: "Nếu không chắc, hãy nói không biết"

---

## 💻 Phần 2: Thực Hành (35 phút)

### 2.1. Khám phá giao diện học (15 phút)

1. **Chạy dự án:**
   ```bash
   # Terminal 1 - Frontend
   cd frontend && pnpm dev

   # Terminal 2 - Backend
   cd backend && pnpm start:dev
   ```

2. **Mở `http://localhost:3000`** → Đọc trang tổng quan

3. **Duyệt qua các giai đoạn:** Xem cấu trúc 6 giai đoạn trên giao diện

### 2.2. Khám phá source code backend (10 phút)

Mở `backend/src/` — xem 21 modules:

```
backend/src/
├── prompt-engineering/     ← GĐ1: LLM Fundamentals
├── structured-output/
├── streaming/
├── model-comparison/
├── embeddings/             ← GĐ2: RAG
├── vector-db/
├── chunking/
├── memory-management/      ← GĐ3: Orchestration
├── chains-routing/
├── function-calling/       ← GĐ4: Agents
├── react-pattern/
├── evaluation/             ← GĐ5: Production
├── observability/
├── cost-optimization/
├── security/
├── error-handling/
├── multimodal/             ← GĐ6: Advanced
├── fine-tuning/
├── local-models/
├── common/                 ← Shared utilities
└── config/                 ← Configuration
```

### 2.3. Đọc Project Ideas (10 phút)

Duyệt qua 4 ý tưởng dự án trên giao diện FE (hoặc `docs/project-ideas/`):

| Ý tưởng | Mô tả ngắn |
|---------|-------------|
| **Personal Knowledge Base** | Hệ thống tri thức cá nhân, hỏi đáp semantic |
| **Trợ lý sản phẩm** | Chatbot tư vấn sản phẩm từ catalog |
| **Meeting Notes** | Tự động tóm tắt, trích xuất action items |
| **Study Coach** | Tạo quiz, flashcards tự động từ tài liệu |

**Bài tập:** Chọn sơ bộ 1 ý tưởng bạn thích nhất. Ghi lý do.

---

## 📝 Phần 3: Củng Cố (15 phút)

### Flashcards (10 phút)

Tạo hoặc ôn 10 flashcards:

| Mặt trước | Mặt sau |
|-----------|---------|
| Context Window là gì? | Giới hạn tối đa thông tin AI đọc được trong 1 lần (đo bằng tokens) |
| Token là gì? | Đơn vị nhỏ nhất AI xử lý. 1 token ≈ 0.75 từ tiếng Anh. Token = chi phí |
| Max Output Token khác Context Window? | Context = đọc được bao nhiêu. Max Output = trả lời được bao dài |
| Hallucination là gì? | AI bịa thông tin thuyết phục nhưng sai. Nguyên nhân: dự đoán xác suất |
| 4 cách chống Hallucination? | Trích nguồn, web search, RAG, system prompt "nói không biết" |
| 5 thành phần AI app? | Bộ não (LLM), Nhớ dài (VectorDB), Nhớ ngắn (Context), Tay chân (Tools), Thần kinh (Orchestration) |
| Tiếng Việt tốn token hơn? | Có! 1 từ tiếng Việt ≈ 2-3 tokens (vs 1 token tiếng Anh) |
| 6 giai đoạn AI Engineer? | LLM Fundamentals → RAG → Orchestration → Agents → Production → Advanced |
| Knowledge cutoff là gì? | Ngày cắt kiến thức — AI chỉ biết dữ liệu đến ngày được train |
| RAG giải quyết vấn đề gì? | Cho AI truy xuất dữ liệu ngoài trước khi trả lời, giảm hallucination |

### Feynman (5 phút)

**Giải thích cho 1 người bạn không biết gì về AI:**

> "Token là gì và tại sao nó quan trọng khi dùng AI?"

Gợi ý: Liên hệ token = tiền, context window = cửa sổ đọc, ảnh hưởng đến cách viết prompt.

---

## ✅ Checklist Ngày 1

- [ ] Đọc xong "12 từ khóa AI" và vẽ mindmap
- [ ] Hiểu 5 thành phần kiến trúc AI app
- [ ] Hiểu Context Window, Token, Max Output Token
- [ ] Hiểu Hallucination và 4 cách phòng tránh
- [ ] Chạy thành công FE + BE
- [ ] Duyệt qua giao diện và chọn sơ bộ Project Idea
- [ ] Hoàn thành 10 flashcards

---
➡️ Ngày tiếp: [Ngày 2: Prompt Engineering + Temperature](./day-02.md)
