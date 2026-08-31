# 📅 Ngày 8: Function Calling + ReAct Pattern

> ⏱️ Thời lượng: **2 giờ**
> 📍 Giai đoạn: Agents
> 🎯 Mục tiêu: AI không chỉ "nói" mà còn "làm" — gọi tools + suy luận nhiều bước

---

## 📖 Phần 1: Lý Thuyết (45 phút)

### 1.1. Function/Tool Calling (20 phút)

**Đọc:** `docs/04-agents/01-function-calling.md`

**Flow cốt lõi:**
```
User: "Gửi email cho Nam, nội dung: Họp lúc 3PM"
  ↓
LLM returns: { function: "sendEmail", arguments: { to: "nam@...", body: "Họp lúc 3PM" } }
  ↓
Your Code: Execute sendEmail(...)
  ↓
LLM: "Đã gửi email thành công!"
```

**Cách define tools cho OpenAI:**
```typescript
const tools = [{
  type: 'function',
  function: {
    name: 'sendEmail',
    description: 'Send an email. Use when user wants to send/compose email.',
    parameters: {
      type: 'object',
      properties: {
        to: { type: 'string', description: 'Recipient email address' },
        body: { type: 'string', description: 'Email content' },
      },
      required: ['to', 'body'],
    },
  },
}];
```

**Best Practice viết description:**
- ❌ Bad: `"Send email"` (quá ngắn)
- ✅ Good: `"Send an email to a recipient. Use this when user wants to send, forward, or compose email."` (rõ ràng, có context)

### 1.2. ReAct Pattern (25 phút)

**Đọc:** `docs/04-agents/02-react-pattern.md`

**ReAct = Reason + Act — Vòng lặp suy luận:**

```
User: "So sánh giá iPhone 15 vs Samsung S24"

Step 1:
  Thought: Cần tìm giá cả hai điện thoại
  Action: searchWeb("iPhone 15 price")
  Observation: iPhone 15: $799

Step 2:
  Thought: Có giá iPhone, giờ cần giá Samsung
  Action: searchWeb("Samsung S24 price")
  Observation: Samsung S24: $849

Step 3:
  Thought: Đủ thông tin để so sánh
  Final Answer: iPhone 15 ($799) rẻ hơn Samsung S24 ($849) $50
```

**So sánh:**

| Function Calling | ReAct Pattern |
|-----------------|---------------|
| 1 tool call duy nhất | Nhiều tool calls trong loop |
| Linear flow | Iterative: Reason → Act → Observe |
| Task đơn giản | Multi-step reasoning |

**LangGraph StateGraph:** Framework mạnh nhất hiện nay cho Agent, mô hình hóa ReAct loop.

**Safety:** Set `MAX_ITERATIONS` (5-10) tránh infinite loop.

---

## 💻 Phần 2: Thực Hành (55 phút)

### 2.1. Demo Function Calling (25 phút)

1. Mở FE → Bài **Function/Tool Calling**
2. Chạy demo: xem AI quyết định gọi tool nào
3. **Đọc code:** `backend/src/function-calling/`
   - Xem cách define tool schemas
   - Xem cách handle `tool_calls` response
   - Xem cách execute function và trả kết quả cho AI

**Bài tập:** Quan sát flow:
1. Gửi request "Tính 15 + 27"
2. Xem AI trả về: `{ function: "add", arguments: { a: 15, b: 27 } }`
3. Code thực thi: `add(15, 27) = 42`
4. AI phản hồi: "Kết quả là 42"

### 2.2. Demo ReAct Pattern (25 phút)

1. Mở FE → Bài **ReAct Pattern**
2. Chạy demo: xem Agent suy luận nhiều bước
3. **Đọc code:** `backend/src/react-pattern/`
   - Xem LangGraph StateGraph setup
   - Xem vòng lặp: agent node → tools node → conditional edges
   - Xem MAX_ITERATIONS safeguard

**Quan sát từng step:**
- Thought: AI đang nghĩ gì?
- Action: Chọn tool nào, tham số gì?
- Observation: Kết quả tool trả về là gì?
- Tiếp tục hay Final Answer?

### 2.3. So sánh thực tế (5 phút)

| Task | Nên dùng |
|------|----------|
| "Gửi email cho sếp" | Function Calling (1 tool, 1 bước) |
| "Tìm vé máy bay rẻ nhất rồi so với ngân sách" | ReAct (nhiều bước: tìm → so sánh) |
| "Tính 5 + 3" | Function Calling |
| "Nghiên cứu thị trường AI Việt Nam" | ReAct (search → đọc → tổng hợp) |

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards (12 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| Function Calling flow? | User → LLM returns tool JSON → Execute function → LLM responds |
| Tool description quan trọng vì? | AI đọc description để quyết định khi nào dùng tool. Bad desc = AI không biết khi nào gọi |
| ReAct pattern? | Reason → Act → Observe → Repeat/Final Answer. Vòng lặp suy luận nhiều bước |
| ReAct khác Function Calling? | FC: 1 tool call. ReAct: nhiều tool calls trong loop + suy luận giữa các bước |
| MAX_ITERATIONS? | Giới hạn số vòng lặp ReAct (5-10), tránh infinite loop |
| LangGraph? | Framework cho Agent, mô hình hóa ReAct bằng StateGraph |
| Agent khác chatbot? | Chatbot chỉ "nói". Agent "nói" + "làm" (gọi API, đọc file, query DB...) |
| Multi-Agent? | Nhiều agent phối hợp, mỗi agent chuyên 1 vai trò |

### Feynman (8 phút)

**Giải thích:** "Agent khác gì chatbot thường? Nó 'hành động' như thế nào?"

**Gợi ý:** Chatbot = hỏi-đáp. Agent = có "tay chân" (tools). AI quyết định gọi tool nào → code thực thi → AI đọc kết quả → tiếp tục suy luận.

---

## ✅ Checklist Ngày 8

- [ ] Hiểu Function Calling flow
- [ ] Biết viết tool schema + description tốt
- [ ] Hiểu ReAct pattern: Reason → Act → Observe
- [ ] Hiểu sự khác biệt Function Calling vs ReAct
- [ ] Chạy demo Function Calling + ReAct trên FE
- [ ] Đọc code `function-calling/` và `react-pattern/`

---
➡️ Ngày tiếp: [Ngày 9: MCP + Ôn tập GĐ2-3-4](./day-09.md)
