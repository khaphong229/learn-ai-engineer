# 📦 Module 02: 📚 RAG & Knowledge Graph
Status: ⬜ Pending
Tuần: 3-4 (9 ngày học)
Prerequisites: Module 01 (LLM Fundamentals)

## 🎯 Mục Tiêu Học Tập
Sau module này, bạn sẽ:
- [ ] Hiểu Embeddings và Cosine Similarity
- [ ] Setup và query được Vector Database
- [ ] Implement được chunking strategies khác nhau
- [ ] Build được pipeline hoàn chỉnh: Upload → Chunk → Embed → Store → Search
- [ ] 🆕 Hiểu Knowledge Graph và khi nào dùng KG vs RAG thuần

## 📅 Lịch Học Chi Tiết

### Ngày 10: Embeddings — Lý thuyết
📖 *Đọc + Ghi chú*
- [ ] Đọc `docs/02-rag/01-embeddings.md`
- [ ] Hiểu Text → Vector: tại sao cần? Hoạt động như nào?
- [ ] Hiểu Cosine Similarity — so sánh ngữ nghĩa
- [ ] Lưu ý cross-lingual: `text-embedding-3-small` vs `text-embedding-3-large`
- **Từ khóa:** Embedding, Vector, Cosine Similarity, Semantic Search, Cross-lingual

### Ngày 11: Embeddings — Thực hành
🎯 *Code along + Practice*
- [ ] Gọi OpenAI Embeddings API tạo vectors cho 10 câu
- [ ] Implement hàm `cosineSimilarity()` bằng tay
- [ ] Tìm câu gần nghĩa nhất trong list (Bài tập 3)
- [ ] Chạy demo Embeddings trong source code

### Ngày 12: Vector Database — Lý thuyết
📖 *Đọc + So sánh*
- [ ] Đọc `docs/02-rag/02-vector-db.md`
- [ ] Hiểu Vector DB vs Traditional DB: `LIKE %keyword%` vs Semantic match
- [ ] So sánh Pinecone vs Supabase (pgvector) vs ChromaDB
- [ ] Hiểu Semantic Search Flow
- **Từ khóa:** pgvector, Pinecone, ChromaDB, Semantic Search, IVFFlat index

### Ngày 13: Vector Database — Thực hành
🎯 *Setup + Build*
- [ ] Setup ChromaDB (TryChroma cloud — đã có config trong dự án)
- [ ] Insert documents vào vector DB
- [ ] Query và nhận kết quả semantic search
- [ ] Chạy demo Vector DB trong source code

### Ngày 14: Chunking Strategy — Phần 1
📖 *Đọc + Phân tích (bài nặng)*
- [ ] Đọc `docs/02-rag/03-chunking-strategy.md` (phần 1-3: Fixed-size, Recursive, Semantic)
- [ ] Hiểu trade-off chunk size: quá lớn vs quá nhỏ
- [ ] Sweet spot: 200-500 tokens/chunk, overlap 10-20%
- **Từ khóa:** Fixed-size chunking, RecursiveCharacterTextSplitter, Semantic chunking, Overlap

### Ngày 15: Chunking Strategy — Phần 2 + Pipeline
📖 *Đọc + Build*
- [ ] Đọc phần 4-5: Document Loaders, Ingestion Pipeline, Best Practices
- [ ] Hiểu pipeline: Upload → Extract → Split → Embed → Store
- [ ] Học chunk size recommendations theo loại content
- [ ] Chạy demo ingestion pipeline trong source code

---

### 🆕 Ngày 16: Knowledge Graph — Nâng cấp sau RAG
📖 *Đọc + So sánh*
> 📌 **Nguồn:** `sources/duc-cppai.md` (Keyword #9) + tìm hiểu thêm
- [ ] Hiểu Knowledge Graph: Entity → Relationship → Entity
- [ ] Ví dụ: "Đức -- CEO of --> CPPAI", "CPPAI -- has product --> OpenClaw"
- [ ] **So sánh RAG vs Knowledge Graph:**
  - RAG: tìm đoạn văn bản liên quan → trả lời câu hỏi đơn lẻ
  - KG: hiểu mối quan hệ giữa các thực thể → suy luận phức tạp
- [ ] Khi nào dùng RAG đủ? Khi nào cần KG?
- [ ] Tìm hiểu: Neo4j, GraphRAG (Microsoft)
- **Từ khóa:** Knowledge Graph, Entity, Relationship, GraphRAG, Neo4j, Triple

> 💡 **Insight từ anh Đức:** "RAG tìm được câu trả lời riêng lẻ nhưng không hiểu bức tranh tổng thể. KG giúp AI suy luận: 'Ai trong team có kinh nghiệm React và đang rảnh?'"

---

### Ngày 17: Ôn tập Module 2 — Flashcards & Feynman
🃏 *Ôn tập + Giải thích*
- [ ] Tạo flashcards: 18 khái niệm RAG + Knowledge Graph
- [ ] Feynman: "RAG giải quyết vấn đề gì mà prompt thường không làm được?"
- [ ] Feynman: "Knowledge Graph khác RAG ở điểm nào? Khi nào cần cái nào?"
- [ ] Vẽ diagram: Semantic Search Flow (Query → Embed → Search → Context → LLM)
- [ ] Ôn lại tất cả từ khóa tuần 3-4

### Ngày 18: Quiz Module 2
📝 *Quiz + Checkpoint*
- [ ] Quiz 12 câu: Embeddings, Vector DB, Chunking strategies, Pipeline, Knowledge Graph vs RAG
- [ ] Target: ≥ 70% đúng
- [ ] Review câu sai

## ✅ Checklist Module
- [ ] Hiểu embeddings và implement được cosine similarity
- [ ] Setup và query được vector database
- [ ] Implement được ≥2 chunking algorithms
- [ ] Build được complete ingestion pipeline
- [ ] 🆕 Hiểu Knowledge Graph và so sánh được với RAG
- [ ] Đạt ≥70% quiz

---
➡️ Module tiếp: [Module 03: 🔗 Orchestration, Agents & MCP](./module-03-orchestration-agents.md)
