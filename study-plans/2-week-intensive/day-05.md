# 📅 Ngày 5: Embeddings + Vector Database

> ⏱️ Thời lượng: **2 giờ**
> 📍 Giai đoạn: RAG (1/2)
> 🎯 Mục tiêu: Biến text thành vector + Lưu trữ & tìm kiếm semantic

---

## 📖 Phần 1: Lý Thuyết (40 phút)

### 1.1. Embeddings (20 phút)

**Đọc:** `docs/02-rag/01-embeddings.md`

**Embeddings là gì?** Biến text thành vector (mảng số) → máy tính hiểu được "ngữ nghĩa".

```
"Con chó" → [0.012, -0.231, 0.88, ...]    (3072 dimensions)
"Gâu gâu" → [0.015, -0.228, 0.85, ...]    ← Gần nhau trong không gian!
"Xe máy"  → [0.892, 0.102, -0.45, ...]     ← Xa nhau
```

**Cosine Similarity:** Đo mức tương đồng giữa 2 vectors (0-1):
- 0.95+ → Rất giống nhau (gần như cùng ý nghĩa)
- 0.7-0.9 → Liên quan
- <0.5 → Không liên quan

**Lưu ý Cross-lingual:**
- `text-embedding-3-small`: Rẻ ($0.02/1M tokens) — yếu đa ngôn ngữ
- `text-embedding-3-large`: Đắt hơn ($0.13/1M tokens) — tốt hơn cross-lingual
- `multilingual-e5-large`: Chuyên biệt đa ngôn ngữ

### 1.2. Vector Database (20 phút)

**Đọc:** `docs/02-rag/02-vector-db.md`

**Vấn đề:** SQL `LIKE '%keyword%'` = tìm chính xác. Vector DB = tìm theo ý nghĩa.

```sql
-- SQL truyền thống (exact match)
SELECT * FROM docs WHERE content LIKE '%chính sách nghỉ ốm%'
-- ❌ Không tìm được nếu viết "quy định nghỉ phép"

-- Vector DB (semantic match)
SELECT * FROM docs ORDER BY embedding <=> query_vector LIMIT 5
-- ✅ Tìm được "quy định nghỉ phép" khi search "chính sách nghỉ ốm"
```

**So sánh Vector DBs:**

| DB | Loại | Ưu điểm | Use case |
|----|------|---------|----------|
| **ChromaDB** | Local/Cloud | Open-source, dev-friendly | Học tập, prototype |
| **Supabase (pgvector)** | Cloud | Postgres extension, full-featured | Production |
| **Pinecone** | SaaS | Scale tốt, managed | Enterprise |

**Semantic Search Flow:**
```
User Query → Generate Embedding → Search Vector DB → Top K Results → Đưa vào LLM Context → AI Response
```

---

## 💻 Phần 2: Thực Hành (60 phút)

### 2.1. Demo Embeddings (20 phút)

1. Mở FE → Bài **Embeddings**
2. Chạy demo: nhập text → xem vector output
3. Thử tìm câu gần nghĩa nhất
4. **Đọc code:** `backend/src/embeddings/`
   - Xem cách gọi OpenAI Embeddings API
   - Xem implementation `cosineSimilarity()`
   - Chú ý comment `BUSINESS`

### 2.2. Demo Vector Database (20 phút)

1. Mở FE → Bài **Vector DB**
2. Chạy demo: insert documents → search semantic
3. **Đọc code:** `backend/src/vector-db/`
   - Xem cách kết nối ChromaDB (TryChroma cloud)
   - Xem cách insert vectors
   - Xem cách query (similarity search)

### 2.3. Hands-on: Full RAG Search (20 phút)

**Bài tập:** Sử dụng demo để:
1. Insert 5-10 câu về các chủ đề khác nhau (công nghệ, ẩm thực, thể thao...)
2. Search bằng câu khác nhưng cùng ý nghĩa
3. Quan sát: AI tìm đúng mặc dù từ khóa khác hoàn toàn

**Ví dụ:**
- Insert: "React là thư viện JavaScript để xây dựng giao diện"
- Search: "Framework nào dùng để làm UI web?"
- Kết quả: Tìm đúng câu về React! (semantic match)

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards (12 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| Embedding là gì? | Biến text thành vector (mảng số) để máy tính hiểu ngữ nghĩa |
| Cosine Similarity? | Đo mức tương đồng giữa 2 vectors. 0.95+ = rất giống. <0.5 = không liên quan |
| Vector DB vs SQL? | SQL: exact match (LIKE). Vector DB: semantic match (tìm theo ý nghĩa) |
| ChromaDB? | Vector DB open-source, dễ dùng, tốt cho dev/prototype |
| pgvector? | Extension Postgres hỗ trợ vector, tích hợp sẵn trong Supabase |
| Semantic Search Flow? | Query → Embed → Search VectorDB → Top K → Đưa vào LLM Context → Response |
| Cross-lingual embedding? | Cần model chuyên biệt (multilingual-e5-large) cho tìm kiếm đa ngôn ngữ |
| RAG giải quyết gì? | AI trả lời dựa trên dữ liệu riêng, giảm hallucination |

### Feynman (8 phút)

**Giải thích:** "Tại sao search Google khác search bằng Embedding?"

**Gợi ý:** Google = keyword matching. Embedding = ý nghĩa. "Con chó" và "Gâu gâu" → Embedding biết liên quan, Google không biết.

---

## ✅ Checklist Ngày 5

- [ ] Hiểu Embeddings: text → vector
- [ ] Hiểu Cosine Similarity
- [ ] Hiểu Vector DB vs Traditional DB
- [ ] Chạy demo Embeddings + Vector DB trên FE
- [ ] Đọc code `embeddings/` và `vector-db/` modules
- [ ] Thực hành semantic search thành công

---
➡️ Ngày tiếp: [Ngày 6: Chunking Strategy + Pipeline + Knowledge Graph](./day-06.md)
