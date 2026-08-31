# 📅 Ngày 9: MCP + Ôn Tập Giai Đoạn 2-3-4

> ⏱️ Thời lượng: **1.5 giờ**
> 📍 Giai đoạn: Agents (kết thúc) + Ôn tập
> 🎯 Mục tiêu: Hiểu MCP + Consolidate RAG, Orchestration, Agents

---

## 📖 Phần 1: MCP — Model Context Protocol (30 phút)

**Đọc:** `sources/duc-cppai.md` — Keyword #11

### MCP là gì?

> "MCP giống USB-C. Trước đây mỗi thiết bị 1 loại sạc riêng, bây giờ tất cả dùng chung 1 chuẩn. MCP là USB-C của thế giới AI."

**Kiến trúc MCP:**
```
┌─────────────────┐
│  AI Application │  ← Host (Antigravity, Cursor, Claude Desktop)
│    (Host)       │
└────────┬────────┘
         ↓
┌─────────────────┐
│   MCP Client    │  ← Giao tiếp theo protocol chuẩn
└────────┬────────┘
         ↓
┌──────────────────────────────────────────┐
│            MCP Servers                    │
├──────────┬──────────┬────────────────────┤
│ GitHub   │ Slack    │ Google Drive, DB...│
└──────────┴──────────┴────────────────────┘
```

**Trước MCP:** Mỗi tool viết integration riêng → tốn thời gian, khó maintain.
**Sau MCP:** Chuẩn hóa → "cắm thêm" MCP server mới dễ dàng.

**Liên hệ:**
- **Function Calling** = cơ chế gọi tool (how)
- **MCP** = protocol kết nối tool (where)
- **ReAct** = pattern suy luận (when/what)
- **Kết hợp cả 3** = Agent mạnh mẽ

**Thực tế:** Bạn đang dùng MCP ngay lúc này! Antigravity IDE kết nối với các công cụ qua MCP.

---

## 💻 Phần 2: Ôn Tập Tổng Hợp (40 phút)

### 2.1. Vẽ Big Picture — Kết nối tất cả (15 phút)

```
═══════════════════════════════════════════════════════
                    AI APPLICATION ARCHITECTURE
═══════════════════════════════════════════════════════

User Input
    ↓
┌──────────────────────────────────┐
│ GĐ1: LLM FUNDAMENTALS           │
│ • Prompt Engineering (input)     │
│ • Structured Output (output)     │
│ • Streaming (UX)                 │
│ • Model Selection (cost/quality) │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│ GĐ2: RAG                        │
│ • Embeddings (text → vector)     │
│ • Vector DB (semantic search)    │
│ • Chunking (split documents)     │
│ • Knowledge Graph (relationships)│
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│ GĐ3: ORCHESTRATION               │
│ • Memory (remember chat history) │
│ • Chains (sequential processing) │
│ • Routing (intent → model)       │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│ GĐ4: AGENTS                     │
│ • Function Calling (execute tools)│
│ • ReAct (reason + act loop)      │
│ • MCP (standardized connections) │
└──────────────┬───────────────────┘
               ↓
           AI Response
```

### 2.2. Quiz nhanh 15 câu (15 phút)

**RAG:**
1. Embedding biến text thành gì?
2. Cosine Similarity 0.95 nghĩa là gì?
3. Chunk quá lớn gây vấn đề gì?
4. RAG giải quyết vấn đề gì của LLM?
5. Knowledge Graph khác RAG ở điểm nào?

**Orchestration:**
6. Tại sao LLM cần Memory?
7. Sliding Window giữ bao nhiêu tin?
8. Router Pattern dùng để làm gì?
9. Khi nào dùng native code thay LangChain?

**Agents:**
10. Function Calling flow gồm mấy bước?
11. Tool description quan trọng vì sao?
12. ReAct pattern là gì?
13. MAX_ITERATIONS tránh vấn đề gì?
14. MCP giống USB-C vì sao?
15. Agent khác chatbot ở điểm nào?

### 2.3. Spaced Repetition (10 phút)

Ôn lại flashcards Ngày 1-4 (GĐ1). Đánh dấu thẻ nào chưa thuộc để ôn lại.

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards MCP (10 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| MCP là gì? | Model Context Protocol — chuẩn kết nối AI với tools bên ngoài (USB-C của AI) |
| Kiến trúc MCP? | Host (AI app) → Client (protocol) → Server (tools: GitHub, Slack...) |
| MCP vs Function Calling? | MCP = protocol kết nối (where). FC = cơ chế gọi (how) |
| Trước vs Sau MCP? | Trước: mỗi tool viết integration riêng. Sau: chuẩn hóa, cắm thêm dễ |
| FC + MCP + ReAct = ? | Agent mạnh mẽ: biết kết nối (MCP), biết gọi (FC), biết suy luận (ReAct) |

### Feynman (10 phút)

**Giải thích (gộp cả 4 giai đoạn):** "Nếu bạn xây một chatbot tư vấn sản phẩm cho công ty, bạn cần kiến thức nào từ 4 giai đoạn đã học?"

**Gợi ý:**
- GĐ1: Prompt Engineering (system prompt), Streaming (UX), Model Selection (chi phí)
- GĐ2: RAG (nạp catalog sản phẩm), Chunking (cắt tài liệu)
- GĐ3: Memory (nhớ customer đang hỏi gì), Routing (classify intent)
- GĐ4: Function Calling (đặt hàng, check stock), MCP (kết nối hệ thống)

---

## ✅ Checklist Ngày 9

- [ ] Hiểu MCP: kiến trúc Host → Client → Server
- [ ] Hiểu mối liên hệ: MCP + Function Calling + ReAct
- [ ] Vẽ được Big Picture 4 giai đoạn
- [ ] Tự quiz ≥ 12/15 câu đúng
- [ ] Ôn lại flashcards GĐ1 (spaced repetition)

---
➡️ Ngày tiếp: [Ngày 10: Evaluation + Observability](./day-10.md)
