# 📅 Ngày 7: Memory Management + Chains & Routing

> ⏱️ Thời lượng: **2 giờ**
> 📍 Giai đoạn: Orchestration
> 🎯 Mục tiêu: Quản lý lịch sử chat + Kết nối xử lý tuần tự/rẽ nhánh

---

## 📖 Phần 1: Lý Thuyết (40 phút)

### 1.1. Memory Management (20 phút)

**Đọc:** `docs/03-orchestration/01-memory-management.md`
**Bổ sung:** `sources/duc-cppai.md` — Keyword #8 (Memory)

**Vấn đề cốt lõi:** LLM là **stateless** — mỗi request độc lập, AI không "nhớ" request trước.

**3 cấp độ Memory (anh Đức):**

| Cấp độ | Mô tả | Ví dụ |
|--------|--------|-------|
| **Conversation** | Nhớ trong cùng cuộc hội thoại | "Bạn vừa hỏi gì?" |
| **Short-term** | Nhớ qua vài phiên | "Hôm qua bạn hỏi về React" |
| **Long-term** | Nhớ lâu dài (sở thích, context) | "Bạn là developer, thích dark mode" |

**3 Memory Strategies:**

| Strategy | Cách hoạt động | Ưu/Nhược |
|----------|---------------|----------|
| **Sliding Window** | Giữ N tin mới nhất (vd: 10 tin) | Đơn giản / Mất context cũ |
| **Summarization** | Dùng AI tóm tắt tin cũ | Giữ được context / Tốn API |
| **Token-based** | Track token count, cắt khi vượt limit | Chính xác / Phức tạp |

**Persistent Storage:** Dùng Redis lưu session chat (không mất khi restart server).

### 1.2. Chains & Routing (20 phút)

**Đọc:** `docs/03-orchestration/02-chains-routing.md`

**Chain = Kết nối các bước xử lý tuần tự:**
```typescript
// Step 1: Translate → Step 2: Summarize → Step 3: Extract Keywords
const translation = await translateLLM(userInput);
const summary = await summarizeLLM(translation);
const keywords = await extractKeywords(summary);
```

**Router = Rẽ nhánh dựa trên intent:**
```typescript
async function routeRequest(input: string) {
  const intent = await classifyIntent(input);
  switch (intent) {
    case 'code':     return codeModel(input);     // Llama 3
    case 'creative': return creativeModel(input);  // Claude
    case 'general':  return generalModel(input);   // GPT-3.5
  }
}
```

> ⚠️ **Cảnh báo:** LangChain có thể phức tạp quá mức. Native TypeScript code thường dễ debug hơn. Chỉ dùng LangChain khi thực sự cần.

---

## 💻 Phần 2: Thực Hành (60 phút)

### 2.1. Demo Memory Management (25 phút)

1. Mở FE → Bài **Memory Management**
2. Chạy demo: chat nhiều câu → xem AI nhớ context
3. **Đọc code:** `backend/src/memory-management/`
   - Xem implementation `SlidingWindowMemory`
   - Xem cách addMessage + getContext
   - Xem Redis integration (nếu có)

**Bài tập:** Test memory:
- Chat: "Tên tôi là Hải" → rồi chat thêm 5-10 câu khác → hỏi "Tên tôi là gì?"
- Quan sát: AI có nhớ không?

### 2.2. Demo Chains & Routing (25 phút)

1. Mở FE → Bài **Chains & Routing**
2. Chạy demo: xem hệ thống tự phân loại và xử lý
3. **Đọc code:** `backend/src/chains-routing/`
   - Xem Router Pattern implementation
   - Xem Simple Chain: Translate → Summarize
   - Xem cách classify intent

**Bài tập:** Thử gửi các loại request khác nhau:
- Câu hỏi về code → xem route đến model nào
- Câu hỏi sáng tạo → xem route khác
- Câu hỏi đơn giản → xem dùng model rẻ

### 2.3. Kết nối kiến thức (10 phút)

**Vẽ diagram Orchestration:**
```
User Message
    ↓
[Memory] → Load chat history (Sliding Window/Summary)
    ↓
[Router] → Classify intent → Chọn model/chain phù hợp
    ↓
[Chain] → Step 1 → Step 2 → Step 3
    ↓
[Memory] → Save response + update history
    ↓
Response to User
```

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards (12 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| Tại sao LLM cần Memory? | LLM stateless — không nhớ request trước. Phải tự gửi kèm lịch sử |
| Sliding Window Memory? | Giữ N tin mới nhất. Đơn giản nhưng mất context cũ |
| Summarization Memory? | Dùng AI tóm tắt tin cũ. Giữ context nhưng tốn API call |
| Redis dùng để làm gì? | Persistent storage — lưu chat session, không mất khi restart |
| Chain là gì? | Kết nối bước xử lý tuần tự: Step1 → Step2 → Step3 |
| Router Pattern? | Phân loại intent → route đến model/handler phù hợp |
| Conditional Chain? | Chain có logic rẽ nhánh: if/else dựa trên kết quả bước trước |
| LCEL (LangChain)? | LangChain Expression Language — framework cho chains. Nhưng native code dễ debug hơn |

### Feynman (8 phút)

**Giải thích:** "Làm sao chatbot 'nhớ' được bạn nói gì 10 câu trước?"

**Gợi ý:** Stateless → phải gửi lại lịch sử → Sliding Window giữ 10 tin gần nhất → kèm vào mỗi request.

---

## ✅ Checklist Ngày 7

- [ ] Hiểu tại sao LLM cần Memory (stateless)
- [ ] Hiểu 3 memory strategies: Sliding Window, Summarization, Token-based
- [ ] Hiểu Chain pattern và Router pattern
- [ ] Chạy demo Memory + Chains trên FE
- [ ] Đọc code `memory-management/` và `chains-routing/`
- [ ] Vẽ diagram Orchestration flow

---
➡️ Ngày tiếp: [Ngày 8: Function Calling + ReAct Pattern](./day-08.md)
