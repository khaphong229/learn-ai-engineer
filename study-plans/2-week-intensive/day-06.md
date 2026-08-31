# 📅 Ngày 6: Chunking Strategy + Ingestion Pipeline + Knowledge Graph

> ⏱️ Thời lượng: **2 giờ**
> 📍 Giai đoạn: RAG (2/2)
> 🎯 Mục tiêu: Cắt document + Pipeline hoàn chỉnh + Knowledge Graph

---

## 📖 Phần 1: Lý Thuyết (45 phút)

### 1.1. Chunking Strategy (25 phút)

**Đọc:** `docs/02-rag/03-chunking-strategy.md`

**Vấn đề:** Không thể nhét cả PDF 100 trang vào AI. Phải cắt nhỏ (chunks).

**Trade-off chunk size:**

| Chunk | Vấn đề |
|-------|--------|
| **Quá lớn (>1000 tokens)** | Tốn context, nhiễu thông tin |
| **Quá nhỏ (<100 tokens)** | Mất ngữ cảnh, không đủ info |
| **Sweet spot: 200-500 tokens** | Đủ context + đủ chính xác |

**4 Chunking Strategies:**

| Strategy | Mô tả | Ưu/Nhược |
|----------|--------|----------|
| **Fixed-size** | Cắt theo kích thước cố định | Đơn giản / Có thể cắt giữa câu |
| **RecursiveCharacter** | Cắt theo paragraph → sentence → character | Giữ ngữ cảnh tốt / Phức tạp |
| **Semantic** | Cắt theo đơn vị ngữ nghĩa | Ý nghĩa tốt nhất / Kích thước không đều |
| **Sentence-based** | Gom nhiều câu cho đến khi đủ size | Tốt cho văn bản rõ ràng |

**Overlap (gối đầu):** 10-20% để không mất thông tin ở ranh giới.

### 1.2. Ingestion Pipeline (10 phút)

**Pipeline hoàn chỉnh:**
```
Upload File → Extract Text → Split Chunks → Generate Embeddings → Store Vector DB
```

**Best Practices chunk size theo loại content:**
- Code: 300-500 tokens
- Articles: 500-800 tokens
- Chat logs: 200-400 tokens
- Tables: 100-300 tokens

### 1.3. Knowledge Graph (10 phút)

**Đọc:** `sources/duc-cppai.md` — Keyword #9

**Knowledge Graph vs RAG:**

| | RAG | Knowledge Graph |
|--|-----|----------------|
| **Lưu trữ** | Đoạn văn bản phẳng | Entity → Relationship → Entity |
| **Tìm kiếm** | Tìm đoạn text liên quan | Duyệt qua mối quan hệ |
| **Sức mạnh** | Trả lời câu hỏi đơn lẻ | Suy luận phức tạp, bức tranh tổng thể |
| **Ví dụ** | "Chính sách nghỉ phép?" | "Ai trong team biết React và đang rảnh?" |

**Khi nào dùng gì?**
- RAG đủ cho 80% use cases
- Knowledge Graph khi cần suy luận về mối quan hệ giữa nhiều thực thể
- Có thể kết hợp cả hai: **GraphRAG** (Microsoft)

---

## 💻 Phần 2: Thực Hành (55 phút)

### 2.1. Demo Chunking (25 phút)

1. Mở FE → Bài **Chunking Strategy**
2. Chạy demo: thử các strategies khác nhau với cùng 1 đoạn text
3. **Đọc code:** `backend/src/chunking/`
   - Xem implementation Fixed-size chunking
   - Xem RecursiveCharacterTextSplitter
   - So sánh output của các strategies

**Bài tập:** Copy 1 đoạn văn dài (Wikipedia), thử chunk với:
- Fixed-size: 500 chars, overlap 50
- Sentence-based: max 500 chars
- So sánh: strategy nào giữ ngữ cảnh tốt hơn?

### 2.2. Full RAG Pipeline (20 phút)

**Trải nghiệm end-to-end:**
1. Upload document (qua demo trên FE)
2. Xem document được chunk thành bao nhiêu phần
3. Embedding và lưu vào Vector DB
4. Search bằng câu hỏi tự nhiên
5. AI trả lời dựa trên dữ liệu vừa upload

**Đọc code pipeline:** Tìm flow `Upload → Chunk → Embed → Store → Search` trong backend.

### 2.3. Ôn tập RAG tổng hợp (10 phút)

**Vẽ full RAG diagram:**
```
                    ┌─────────────┐
                    │ Upload File │
                    └──────┬──────┘
                           ↓
                    ┌──────────────┐
                    │ Extract Text │
                    └──────┬───────┘
                           ↓
                    ┌──────────────┐
                    │ Chunk (split)│ ← Strategy: Recursive/Semantic
                    └──────┬───────┘
                           ↓
                    ┌───────────────┐
                    │ Generate      │ ← OpenAI Embeddings API
                    │ Embeddings    │
                    └──────┬────────┘
                           ↓
                    ┌──────────────┐
                    │ Store in     │ ← ChromaDB / pgvector
                    │ Vector DB    │
                    └──────────────┘

    ════════════ SEARCH TIME ════════════

    User Query → Embed → Search VectorDB → Top K chunks
         ↓
    Combine: System Prompt + Top K chunks + User Query
         ↓
    Send to LLM → AI Response (based on YOUR data)
```

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards (12 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| Chunking giải quyết vấn đề gì? | Không thể nhét cả document vào AI. Cắt nhỏ → embed → search phần liên quan |
| Sweet spot chunk size? | 200-500 tokens/chunk, overlap 10-20% |
| RecursiveCharacterTextSplitter? | Cắt thông minh: paragraph → sentence → character (giữ ngữ cảnh) |
| Overlap để làm gì? | Tránh mất thông tin ở ranh giới giữa 2 chunks |
| RAG Pipeline? | Upload → Extract → Chunk → Embed → Store → Search |
| Knowledge Graph là gì? | Tổ chức thông tin: Entity → Relationship → Entity. Suy luận mối quan hệ |
| KG khác RAG thế nào? | RAG: tìm text liên quan. KG: hiểu mối quan hệ, suy luận phức tạp |
| GraphRAG? | Kết hợp Knowledge Graph + RAG (Microsoft) — best of both worlds |

### Feynman (8 phút)

**Giải thích:** "Nếu bạn có 1000 trang tài liệu công ty, làm sao để AI trả lời chính xác dựa trên đó?"

**Gợi ý:** Chunk → Embed → Vector DB → Khi user hỏi → Search semantic → Đưa top chunks vào context → AI trả lời.

---

## ✅ Checklist Ngày 6

- [ ] Hiểu 4 chunking strategies và trade-offs
- [ ] Hiểu sweet spot: 200-500 tokens, overlap 10-20%
- [ ] Chạy demo Chunking trên FE
- [ ] Hiểu full RAG pipeline end-to-end
- [ ] Hiểu Knowledge Graph vs RAG
- [ ] Vẽ được full RAG diagram

---
➡️ Ngày tiếp: [Ngày 7: Memory Management + Chains & Routing](./day-07.md)
