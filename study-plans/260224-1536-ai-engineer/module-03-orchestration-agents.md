# 📦 Module 03: 🔗 Orchestration, Agents & MCP
Status: ⬜ Pending
Tuần: 5-6 (8 ngày học)
Prerequisites: Module 02 (RAG & Knowledge Graph)

## 🎯 Mục Tiêu Học Tập
Sau module này, bạn sẽ:
- [ ] Quản lý được conversation memory (Sliding Window, Summarization)
- [ ] Build được chains và routing logic
- [ ] Hiểu và implement được Function/Tool Calling
- [ ] Hiểu ReAct pattern và build được multi-step agent
- [ ] 🆕 Hiểu MCP (Model Context Protocol) — cách kết nối AI với external tools

## 📅 Lịch Học Chi Tiết

### Ngày 19: Memory Management
📖 *Đọc + Code along*
- [ ] Đọc `docs/03-orchestration/01-memory-management.md`
- [ ] Hiểu tại sao LLM cần memory (stateless)
- [ ] Đọc lại 3 cấp độ memory từ `sources/duc-cppai.md` (Keyword #8): conversation / short-term / long-term
- [ ] Học 3 strategies: Sliding Window, Summarization, Token-based Truncation
- [ ] Đọc code Redis persistent storage
- **Từ khóa:** Stateless, Context Window, Sliding Window, Summarization, Redis, Long-term Memory

### Ngày 20: Memory — Thực hành + Chains & Routing Lý thuyết
🎯 *Practice + Đọc*
- [ ] Implement Sliding Window Memory (Bài tập 1)
- [ ] Đọc `docs/03-orchestration/02-chains-routing.md`
- [ ] Hiểu Simple Chain, Router Pattern, Conditional Chains
- [ ] Lưu ý: LangChain có thể phức tạp quá, native code thường dễ debug hơn
- **Từ khóa:** Chain, Router, Intent Classification, LCEL, Pipeline

### Ngày 21: Chains & Routing — Thực hành
🎯 *Build + Practice*
- [ ] Build simple chain: Translate → Summarize (Bài tập 1)
- [ ] Build router phân loại intent → gọi model phù hợp (Bài tập 2)
- [ ] Chạy demo trong source code

### Ngày 22: Function/Tool Calling
📖 *Đọc + Code along*
- [ ] Đọc `docs/04-agents/01-function-calling.md`
- [ ] Hiểu flow: User request → LLM returns tool call JSON → Execute function → LLM responds
- [ ] Học cách viết function descriptions tốt (❌ Bad vs ✅ Good)
- [ ] Implement calculator tool (Bài tập 1)
- **Từ khóa:** Function Calling, Tool, Function Schema, Parameters, Tool Calls

### Ngày 23: ReAct Pattern — Lý thuyết (bài nặng)
📖 *Đọc + Phân tích*
- [ ] Đọc `docs/04-agents/02-react-pattern.md`
- [ ] Hiểu vòng lặp: Reason → Act → Observe → Repeat/Final Answer
- [ ] So sánh với ví dụ email workflow của anh Đức (`sources/duc-cppai.md`, Keyword #10): Agent tự đọc email → phân loại → tạo ticket → assign → draft reply → chờ duyệt
- [ ] Đọc code LangGraph StateGraph
- **Từ khóa:** ReAct, Reason+Act, StateGraph, LangGraph, Max Iterations, Multi-Agent

### Ngày 24: ReAct — Thực hành + So sánh
🎯 *Deep Dive*
- [ ] So sánh Function Calling vs ReAct: khi nào dùng cái nào?
- [ ] Hiểu Max Iterations & Safety (tránh infinite loop)
- [ ] Đọc code trong source code backend
- [ ] Ghi chú: 5 design patterns áp dụng trong Agent

---

### 🆕 Ngày 25: MCP (Model Context Protocol)
📖 *Đọc + Tìm hiểu*
> 📌 **Nguồn:** `sources/duc-cppai.md` (Keyword #11) + tìm hiểu thêm
- [ ] Hiểu MCP là gì: "USB-C của thế giới AI" — chuẩn kết nối AI với tools
- [ ] So sánh: trước MCP (mỗi tool viết integration riêng) vs sau MCP (chuẩn hóa)
- [ ] Kiến trúc MCP: Host (AI app) → Client → Server (tools)
- [ ] Tìm hiểu MCP servers phổ biến: GitHub, Slack, Google Drive, Database
- [ ] Liên hệ với Function Calling: MCP là lớp protocol, Function Calling là cơ chế gọi
- [ ] Thực tế: Bạn đang dùng MCP ngay lúc này (Antigravity kết nối NotebookLM, Figma qua MCP!)
- **Từ khóa:** MCP, Model Context Protocol, MCP Server, MCP Client, Host, Tool Integration

> 💡 **Insight:** MCP biến AI từ "chatbot hỏi-đáp" thành "trung tâm điều phối" có thể truy cập mọi hệ thống. Kết hợp Function Calling + MCP + ReAct = Agent mạnh mẽ.

---

### Ngày 26: Quiz Module 3
📝 *Quiz + Ôn tập*
- [ ] Quiz 12 câu: Memory strategies, Chains, Function Calling, ReAct, MCP
- [ ] Flashcards ôn tập: 18 khái niệm
- [ ] Feynman: "Agent khác gì chatbot thường? ReAct giải quyết gì?"
- [ ] Feynman: "MCP giải quyết vấn đề gì trong hệ sinh thái AI?"
- [ ] Target: ≥ 70%

## ✅ Checklist Module
- [ ] Implement được memory management
- [ ] Build được router với intent classification
- [ ] Define và handle được function/tool calls
- [ ] Hiểu ReAct pattern và khi nào dùng
- [ ] 🆕 Hiểu MCP và vai trò trong Agent ecosystem
- [ ] Đạt ≥70% quiz

---
➡️ Module tiếp: [Module 04: 🚀 Production](./module-04-production.md)
