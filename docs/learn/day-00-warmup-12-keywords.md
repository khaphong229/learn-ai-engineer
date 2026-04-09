# 📖 Ngày 0 — Warm-up: 12 Từ Khóa AI Nền Tảng

> **Nguồn:** Bài chia sẻ "12 từ khóa AI" — anh Đức (CPP AI)
> **Mục tiêu:** Hiểu toàn cảnh 12 keyword trước khi đào sâu từng phần
> **Thời lượng:** ~45-60 phút (hôm nay đặc biệt dài hơn 30 phút vì là bài overview)
> **Cách học:** Đọc → Hiểu bản chất → Liên hệ thực tế → Thực hành ngay

---

## 🗺️ Mindmap Tổng Thể: 12 Keywords

```
                          🧠 AI APPLICATION ENGINEER
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
     ⚙️ NỀN TẢNG            🔧 KỸ THUẬT              🏗️ HỆ THỐNG
     (Hiểu AI là gì)       (Dùng AI thế nào)        (Xây sản phẩm AI)
            │                       │                       │
     ┌──────┼──────┐         ┌──────┼──────┐         ┌──────┼──────┐
     │      │      │         │      │      │         │      │      │
   Token  Model  Temp     Prompt   RAG  Fine-tune  Agent  Memory  MCP
   (1,2)   (3)    (6)     Eng(5)   (7)    (12)     (10)    (8)   (11)
     │                       │                       │
     └──── Hallucination ────┘                Knowledge Graph
            (4)                                  (9)
```

### Cách đọc Mindmap:

| Nhóm | Keyword | Tại sao quan trọng |
|------|---------|-------------------|
| ⚙️ **Nền tảng** | Context/Token (1,2), Model (3), Hallucination (4), Temperature (6) | Hiểu AI hoạt động ra sao → dùng đúng, tránh sai |
| 🔧 **Kỹ thuật** | Prompt Engineering (5), RAG (7), Fine-tuning (12) | 3 cách "dạy" AI → chọn đúng cách cho đúng bài toán |
| 🏗️ **Hệ thống** | Memory (8), Knowledge Graph (9), Agent (10), MCP (11) | Xây AI thành sản phẩm thực sự → tự động hóa business |

> **Quy luật leo thang:** Prompt Engineering → RAG → Fine-tuning. Luôn thử cách rẻ nhất trước!

---

## 📚 Deep Dive Từng Keyword

### 1️⃣ Context / Context Length / Max Output Token

**Bản chất:** Context = "bộ nhớ tạm" của AI trong MỘT cuộc hội thoại.

Hãy tưởng tượng AI như một người đọc sách, nhưng chỉ có một bàn nhỏ. Tất cả giấy tờ (system prompt, tin nhắn cũ, file đính kèm, kết quả search) đều phải đặt trên bàn đó. Bàn có kích thước giới hạn = **Context Window**.

```
┌─────────────── Context Window (VD: 200K tokens) ───────────────┐
│                                                                  │
│  [System Prompt]  +  [Chat History]  +  [Files]  +  [Search]    │
│      ~500 tok          ~2K tok          ~50K tok     ~5K tok     │
│                                                                  │
│  Tổng đã dùng: ~57.5K / 200K = 28.75%                          │
│  Còn trống: ~142.5K tokens                                      │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

Max Output Token = giới hạn câu trả lời
├── Model đọc được 200K (input) nhưng chỉ viết được 16K (output)
└── VD: Yêu cầu viết sách 100 trang → AI bị cắt giữa chừng
```

**So sánh các model phổ biến (2026):**

| Model | Context Window | Max Output | Ghi chú |
|-------|---------------|------------|---------|
| Gemini 2.5 Pro | 1M tokens | 65K | Context lớn nhất hiện tại |
| Claude Sonnet 4 | 200K tokens | 16K | Cân bằng tốt |
| GPT-4o | 128K tokens | 16K | Phổ biến nhất |
| Claude Haiku | 200K tokens | 4K | Rẻ nhưng output ngắn |

**❌ Sai lầm thường gặp:**
- Nhét cả file PDF 200 trang → tràn context → AI chỉ đọc phần đầu, "quên" phần cuối
- Không biết max output → viết dài bị cắt → tưởng AI lỗi

**✅ Cách làm đúng:**
- Chia nhỏ file, gửi từng phần
- Chọn model có context đủ lớn cho task
- Dùng RAG (keyword #7) thay vì nhét hết vào context
- Tăng max output khi cần AI viết dài

---

### 2️⃣ Token

**Bản chất:** Token = đơn vị nhỏ nhất AI xử lý. **Không phải từ, không phải ký tự.**

```
Tiếng Anh: "Hello world" → 2 tokens  (1 token ≈ 0.75 từ ≈ 4 ký tự)
Tiếng Việt: "Xin chào"   → 4 tokens! (dấu + ký tự đặc biệt → tốn 2-3x)

📊 So sánh chi phí thực tế:
┌────────────────────────────────────────────────────┐
│  English prompt (100 từ)  ≈  130 tokens ≈ $0.001  │
│  Vietnamese prompt (100 từ) ≈ 300 tokens ≈ $0.003 │
│  → Tiếng Việt TỐN GẤP 2-3 LẦN!                   │
└────────────────────────────────────────────────────┘
```

**Tại sao phải biết?**
1. **Chi phí** = (Input tokens + Output tokens) × Giá/token
2. **Context limit** đo bằng token, không phải chữ
3. **Tối ưu prompt** = tiết kiệm tiền + fit vào context

**❌ Sai lầm:** Gửi prompt 5000 từ cho câu hỏi đơn giản → tốn gấp 10x, kết quả không khá hơn
**✅ Cách đúng:** Prompt ngắn gọn, chỉ đưa context cần thiết. Task đơn giản → model rẻ. Task phức tạp → model đắt.

---

### 3️⃣ Model — Không Phải AI Nào Cũng Giống Nhau

**Bản chất:** Có NHIỀU loại model AI, phục vụ các mục đích khác nhau.

```
🧠 Phân loại theo NĂNG LỰC:
┌──────────────────┬──────────────────────────┬──────────────────────────┐
│ Loại             │ Làm gì                   │ Ví dụ                    │
├──────────────────┼──────────────────────────┼──────────────────────────┤
│ LLM              │ Viết, phân tích, code    │ Claude, GPT, Gemini      │
│ Image Gen        │ Tạo ảnh từ mô tả        │ Midjourney, DALL-E, Flux │
│ Video Gen        │ Tạo video               │ Sora, Kling, Veo         │
│ TTS              │ Văn bản → Giọng nói     │ ElevenLabs, Azure TTS    │
│ STT              │ Giọng nói → Văn bản     │ Whisper, Deepgram        │
│ Embedding        │ Văn bản → Vector số     │ text-embedding-3         │
│ Multimodal       │ Xử lý text+ảnh+audio    │ GPT-4o, Gemini           │
└──────────────────┴──────────────────────────┴──────────────────────────┘

💰 Phân loại theo KHẢ NĂNG & CHI PHÍ (cùng 1 hãng):
┌────────────┬──────────────────────┬──────────────────────────────────┐
│ Tầng       │ Đặc điểm             │ Ví dụ                            │
├────────────┼──────────────────────┼──────────────────────────────────┤
│ Flagship   │ Thông minh nhất,     │ Claude Opus, Gemini Ultra        │
│            │ ĐẮT nhất, CHẬM nhất │                                  │
│ Mid-tier   │ CÂN BẰNG chất lượng │ Claude Sonnet, GPT-4o-mini       │
│            │ và chi phí           │                                  │
│ Light      │ NHANH nhất, RẺ nhất  │ Claude Haiku, Gemini Flash       │
└────────────┴──────────────────────┴──────────────────────────────────┘
```

**Chiến lược Model Tiering (tiết kiệm 80-90% chi phí):**
- Task đơn giản (phân loại email, format text) → **Light** (Haiku/Flash)
- Task trung bình (viết email, tóm tắt) → **Mid-tier** (Sonnet)
- Task phức tạp (phân tích chiến lược, code khó) → **Flagship** (Opus)

---

### 4️⃣ Hallucination — "Ảo Giác" Của AI

**Bản chất:** AI **bịa thông tin** nghe rất thuyết phục nhưng SAI HOÀN TOÀN.

AI không "cố ý nói dối". Cơ chế LLM = dự đoán token tiếp theo có xác suất cao nhất. Khi thiếu dữ liệu → vẫn tạo câu trôi chảy, nhưng **nội dung bịa**.

```
⚠️ Các dạng hallucination phổ biến:
├── 📊 Bịa số liệu thống kê ("Theo khảo sát 2025 của McKinsey..." → KHÔNG TỒN TẠI)
├── 🔗 Bịa link URL ("Xem tại https://example.com/report" → 404)
├── 📚 Bịa tên sách/tác giả ("Trong cuốn 'AI Revolution' của Dr.Smith" → KHÔNG CÓ)
├── 📝 Bịa trích dẫn nghiên cứu
└── 💪 Tự tin khẳng định điều sai là đúng (giọng rất chắc chắn!)
```

**Cách giảm Hallucination:**

| Phương pháp | Hiệu quả | Cách làm |
|------------|-----------|----------|
| Yêu cầu trích nguồn | ⭐⭐⭐ | Thêm "Trích dẫn nguồn cho mọi thông tin" vào prompt |
| Bật Web Search | ⭐⭐⭐⭐ | AI có dữ liệu thực thay vì "tự nghĩ" |
| Dùng RAG | ⭐⭐⭐⭐⭐ | AI trả lời từ DỮ LIỆU CỦA BẠN |
| System prompt discipline | ⭐⭐⭐ | "Nếu không chắc chắn, nói KHÔNG BIẾT" |
| Cross-check | ⭐⭐⭐⭐ | Kiểm chứng thông tin quan trọng trước khi dùng |

> **Nguyên tắc vàng:** AI là "intern giỏi" — viết nhanh, viết hay, nhưng LUÔN cần review!

---

### 5️⃣ Prompt Engineering / System Prompt

**Bản chất:** Prompt = câu lệnh gửi AI. **Prompt Engineering = nghệ thuật viết prompt để AI hiểu ĐÚNG ý bạn.**

```
System Prompt (ẩn, dev đặt)        User Prompt (bạn gõ)
┌──────────────────────┐            ┌──────────────────────┐
│ "Bạn là chuyên gia   │            │ "Viết email follow-  │
│  marketing B2B.      │     +      │  up cho CEO công ty  │
│  Giọng chuyên nghiệp │            │  sản xuất, sau demo" │
│  nhưng thân thiện."  │            │                      │
└──────────────────────┘            └──────────────────────┘
         ↓↓↓                                 ↓↓↓
         ──────────── AI xử lý ────────────
                        ↓
              Kết quả chất lượng cao ✅
```

**5 kỹ thuật prompt cơ bản:**

| # | Kỹ thuật | Ý nghĩa | Khi nào dùng |
|---|---------|---------|-------------|
| 1 | **Role Prompting** | Giao vai trò cụ thể | Cần chuyên môn sâu |
| 2 | **Few-shot** | Cho 2-5 ví dụ mẫu | Cần output đúng format |
| 3 | **Chain-of-Thought** | Yêu cầu suy luận từng bước | Task logic phức tạp |
| 4 | **Output Format** | Chỉ định format (JSON, bảng...) | Cần structured output |
| 5 | **Constraints** | Đặt ràng buộc rõ ràng | Giới hạn scope, tránh lan man |

**So sánh prompt tệ vs prompt tốt:**

```
❌ TỆ:  "Viết cho tôi một email"
   → AI viết email chung chung, sáo rỗng, vứt sọt rác

✅ TỐT: "Bạn là chuyên gia marketing B2B.
         Viết email follow-up cho CEO công ty sản xuất,
         sau buổi demo sản phẩm AI automation.
         Giọng: chuyên nghiệp nhưng thân thiện.
         Dưới 150 từ. CTA: đặt lịch demo lần 2.
         Tránh từ spam."
   → AI viết email dùng được ngay!
```

---

### 6️⃣ Temperature

**Bản chất:** Temperature = "nút vặn sáng tạo" của AI. Giá trị 0 → 1 (hoặc 2).

```
Temperature thấp (0-0.3)          Temperature cao (0.8-1.0+)
┌─────────────────────┐           ┌─────────────────────┐
│ 🎯 Chính xác        │           │ 🎨 Sáng tạo         │
│ 📊 Nhất quán        │           │ 🎲 Đa dạng          │
│ 🔁 Mỗi lần giống nhau│          │ 🎭 Mỗi lần khác     │
│                     │           │                     │
│ Dùng cho:           │           │ Dùng cho:           │
│ • Code              │           │ • Brainstorm        │
│ • Phân tích dữ liệu│           │ • Viết sáng tạo     │
│ • Dịch thuật        │           │ • Đặt tên brand     │
│ • Hợp đồng pháp lý │           │ • Viết content      │
└─────────────────────┘           └─────────────────────┘
         0                  0.5                  1.0
         ├────────────┼────────────┤
              Cân bằng (0.4-0.7)
              • Email, tóm tắt
              • Chatbot hỗ trợ
```

**❌ Sai lầm:** Dùng temperature cao (0.9) viết hợp đồng pháp lý → mỗi lần một kiểu, bịa thêm điều khoản!
**✅ Đúng:** Temperature thấp cho chính xác. Tăng temperature khi cần sáng tạo.

---

### 7️⃣ RAG (Retrieval-Augmented Generation)

**Bản chất:** RAG = "cho AI tra cứu trước khi trả lời", thay vì chỉ dùng kiến thức cũ trong model.

```
KHÔNG CÓ RAG:
User hỏi → AI dùng kiến thức cũ → ❌ Bịa (hallucination)

CÓ RAG:
User hỏi → 🔍 Tìm trong kho dữ liệu → Đưa kết quả vào context → AI trả lời từ DỮ LIỆU THẬT ✅

┌─────────────────────────────────────────────────────────────┐
│                    QUY TRÌNH RAG                            │
│                                                             │
│  📝 Câu hỏi                                                │
│     ↓                                                       │
│  🔍 Tìm kiếm (Vector DB, Database, Files, Web)             │
│     ↓                                                       │
│  📄 Kết quả tìm được (top 3-5 đoạn liên quan nhất)         │
│     ↓                                                       │
│  📦 Đưa vào Context: "Dựa trên tài liệu sau: {kết quả}"   │
│     ↓                                                       │
│  🤖 AI trả lời DỰA TRÊN DỮ LIỆU THẬT                     │
│     ↓                                                       │
│  ✅ Kết quả chính xác, có nguồn, giảm hallucination        │
└─────────────────────────────────────────────────────────────┘
```

**Tại sao cần RAG?**
- LLM có **knowledge cutoff** (ngày cắt kiến thức) → không biết tin mới
- Dữ liệu nội bộ công ty → AI không thể biết nếu không cung cấp
- Giảm hallucination gần = 0 trong domain cụ thể

---

### 8️⃣ Memory

**Bản chất:** Memory = khả năng AI **nhớ thông tin giữa các cuộc hội thoại**.

```
KHÔNG CÓ MEMORY:
Chat mới → AI quên hết → Phải giới thiệu lại → Lặp đi lặp lại 😩

CÓ MEMORY:
Chat mới → AI nhớ bạn là ai → Trả lời sát context → Càng dùng càng hiểu bạn 🎯

📊 3 cấp độ Memory:
┌──────────────────────┬─────────────────────────────────────────┐
│ Conversation Memory  │ Nhớ trong CÙNG cuộc hội thoại           │
│ (ngắn hạn)          │ VD: "Như tôi nói ở trên..." → AI hiểu   │
├──────────────────────┼─────────────────────────────────────────┤
│ Short-term Memory    │ Nhớ qua VÀI phiên                       │
│ (trung hạn)         │ VD: "Hôm qua bạn hỏi về X..."          │
├──────────────────────┼─────────────────────────────────────────┤
│ Long-term Memory     │ Nhớ LÂU DÀI — sở thích, thói quen      │
│ (dài hạn)           │ VD: "Bạn thích code Python, dùng VSCode"│
└──────────────────────┴─────────────────────────────────────────┘
```

> **Liên hệ thực tế:** `.brain/` folder trong project này chính là **Memory** cho Antigravity! `session.json` = short-term, `brain.json` = long-term.

---

### 9️⃣ Knowledge Graph

**Bản chất:** Knowledge Graph = tổ chức thông tin thành **mạng lưới quan hệ**, thay vì văn bản phẳng.

```
📄 Văn bản phẳng (RAG truyền thống):
"Đức là CEO CPPAI. CPPAI có sản phẩm OpenClaw. OpenClaw là multi-agent framework."
→ AI tìm từng câu riêng lẻ, KHÔNG thấy bức tranh tổng thể

🕸️ Knowledge Graph:
   Đức ──[là CEO của]──→ CPPAI
                            │
                       [có sản phẩm]
                            │
                            ↓
                        OpenClaw ──[là]──→ Multi-agent Framework
→ AI HIỂU MỐI QUAN HỆ → suy luận tốt hơn

VD câu hỏi: "Ai trong team biết React và đang rảnh?"
RAG: ❌ Tìm không ra (thông tin rải rác nhiều file)
KG:  ✅ Duyệt graph: Nhân viên → Kỹ năng → Lịch trình → Trả lời ngay
```

**So sánh RAG vs Knowledge Graph:**

| Tiêu chí | RAG | Knowledge Graph |
|----------|-----|-----------------|
| Dữ liệu | Văn bản chunks | Entities + Relationships |
| Tìm kiếm | Semantic search | Graph traversal |
| Điểm mạnh | Nhanh, dễ setup | Suy luận quan hệ phức tạp |
| Điểm yếu | Không thấy quan hệ | Setup phức tạp hơn |
| Khi nào dùng | FAQ, tài liệu | Org chart, sản phẩm liên quan |

---

### 🔟 AI Agent / Multi-Agent

**Bản chất:** Agent = AI có khả năng **HÀNH ĐỘNG**, không chỉ trả lời.

```
CHATBOT thông thường:          AI AGENT:
User hỏi → AI trả lời         User ra lệnh → AI tự làm
     (chỉ NÓI)                      (NÓI + LÀM)

Ví dụ: "Đặt lịch họp 2pm thứ 3"
Chatbot: "Bạn nên mở Google Calendar..." → BẠN tự làm 😅
Agent:   *Tự mở Calendar, tạo event, mời người* → XONG! ✅

🔄 Agent Loop (ReAct Pattern):
┌──────────────────────────────────────────┐
│  1. REASON  — Suy nghĩ: cần làm gì?     │
│  2. ACT     — Hành động: gọi API, đọc DB │
│  3. OBSERVE — Quan sát: kết quả ra sao?  │
│  4. Lặp lại cho đến khi xong             │
└──────────────────────────────────────────┘

🤝 Multi-Agent = Nhiều agent phối hợp:
Agent A (Phân tích) → Agent B (Viết) → Agent C (Review)
```

**Liên hệ thực tế:** Antigravity (AI bạn đang dùng) chính là một **AI Agent**! Nó có thể:
- Đọc/ghi file (tool: `view_file`, `write_to_file`)
- Chạy command (tool: `run_command`)
- Tìm kiếm web (tool: `search_web`)
- Tương tác browser (tool: `browser_subagent`)

---

### 1️⃣1️⃣ MCP (Model Context Protocol)

**Bản chất:** MCP = **chuẩn kết nối** giữa AI và các tool/dữ liệu bên ngoài. Giống **USB-C** cho thế giới AI.

```
TRƯỚC MCP (mỗi tool 1 integration riêng):
AI ──[custom code]──→ Calendar
AI ──[custom code]──→ Gmail
AI ──[custom code]──→ Slack
AI ──[custom code]──→ Database
→ Mỗi lần thêm tool = viết code mới từ đầu 😩

SAU MCP (1 chuẩn chung):
AI ──[MCP]──→ Calendar MCP Server
AI ──[MCP]──→ Gmail MCP Server
AI ──[MCP]──→ Slack MCP Server
AI ──[MCP]──→ Database MCP Server
→ Thêm tool mới = cắm thêm 1 server, không viết lại gì 🎉
```

**Liên hệ thực tế:** Bạn đang dùng MCP ngay lúc này!
- `NotebookLM MCP` → AI kết nối NotebookLM
- `Figma MCP` → AI đọc design từ Figma
- `StitchMCP` → AI tạo UI

---

### 1️⃣2️⃣ Fine-tuning vs Prompt Engineering vs RAG

**Bản chất:** 3 cách "dạy" AI, khác nhau hoàn toàn về mục đích và chi phí.

```
📊 QUY LUẬT LEO THANG (Escalation Path):

  Thử PE trước ($) → Nếu chưa đủ → Thêm RAG ($$) → Nếu vẫn chưa đủ → Fine-tune ($$$)

┌──────────────────┬──────────────────┬──────────────────┐
│ Prompt           │ RAG              │ Fine-tuning      │
│ Engineering      │                  │                  │
├──────────────────┼──────────────────┼──────────────────┤
│ 💰 Thấp nhất    │ 💰💰 Trung bình  │ 💰💰💰 Cao nhất │
│ ⏱️ Vài phút     │ ⏱️ Vài ngày      │ ⏱️ Vài tuần     │
│ 📝 Viết prompt  │ 📚 Cung cấp data │ 🔧 Huấn luyện   │
│    thông minh hơn│    bên ngoài     │    lại model     │
├──────────────────┼──────────────────┼──────────────────┤
│ ✅ 70% use case  │ ✅ 20% use case  │ ✅ 10% use case  │
│ VD: Email, tóm   │ VD: FAQ nội bộ,  │ VD: Giọng văn   │
│ tắt, phân tích   │ catalog sản phẩm │ brand riêng,     │
│                  │                  │ domain siêu chuyên│
└──────────────────┴──────────────────┴──────────────────┘
```

> **Số liệu thực tế:** 90% nhu cầu doanh nghiệp giải quyết được bằng PE + RAG. Đừng vội fine-tune!

---

## 🧪 BÀI THỰC HÀNH (Hands-on)

> **Công cụ:** Mở [Google AI Studio](https://aistudio.google.com) (bạn đã có Google One AI Premium)

### Bài 1: Cảm nhận Token (5 phút)

Mở Google AI Studio, gõ lần lượt 2 prompt sau và quan sát **token count**:

```
Prompt A (Tiếng Anh):
"Explain what machine learning is in 3 sentences."

Prompt B (Tiếng Việt):
"Giải thích machine learning là gì trong 3 câu."
```

**Quan sát:**
- [ ] Prompt A dùng bao nhiêu token?
- [ ] Prompt B dùng bao nhiêu token?
- [ ] Tiếng Việt tốn nhiều hơn bao nhiêu %?

---

### Bài 2: So sánh Temperature (5 phút)

Trong AI Studio, hỏi CÙNG 1 câu nhưng thay đổi Temperature:

```
Prompt: "Đặt 3 tên hay cho quán cà phê phong cách retro ở Sài Gòn"

Lần 1: Temperature = 0.1 → Ghi lại kết quả
Lần 2: Temperature = 0.1 → So sánh với lần 1 (gần giống nhau?)
Lần 3: Temperature = 1.0 → So sánh với lần 1-2 (khác biệt nhiều?)
Lần 4: Temperature = 1.0 → So sánh với lần 3 (mỗi lần khác nhau?)
```

**Quan sát:**
- [ ] Temp 0.1: Hai lần gần giống nhau không?
- [ ] Temp 1.0: Hai lần khác nhau thế nào?
- [ ] Kết luận: Temperature ảnh hưởng gì?

---

### Bài 3: Prompt Engineering Battle (10 phút)

So sánh prompt tệ vs prompt tốt:

```
❌ PROMPT TỆ:
"Viết giới thiệu bản thân cho CV"

✅ PROMPT TỐT (bạn tự viết!):
[Áp dụng 5 kỹ thuật đã học:
 1. Role: Giao vai trò cho AI
 2. Few-shot: Cho 1 ví dụ mẫu
 3. Constraints: Giới hạn (số từ, giọng văn)
 4. Output format: Chỉ định format
 5. Context: Thêm thông tin về bạn]

Gợi ý prompt tốt:
"Bạn là chuyên gia viết CV cho ngành IT.
 Viết phần giới thiệu bản thân cho junior developer,
 biết JavaScript và đang học AI.
 Giọng: tự tin nhưng không phô trương.
 Dưới 100 từ. 3 câu.
 Format: 1 đoạn văn liền mạch."
```

**Quan sát:**
- [ ] Kết quả prompt tệ vs tốt khác nhau thế nào?
- [ ] Bạn có tự viết được prompt tốt không?

---

### Bài 4: Bắt Quả Tang Hallucination (5 phút)

```
Prompt: "Cho tôi 5 nghiên cứu khoa học về tác dụng của cà phê
         đối với năng suất lập trình, kèm link paper và tác giả"
```

**Kiểm tra:**
- [ ] Mở Google, search tên paper AI đưa ra → có tồn tại không?
- [ ] Link URL có mở được không?
- [ ] Tên tác giả có thật không?
- [ ] Bao nhiêu trong 5 kết quả là bịa?

---

### Bài 5: Tự Đánh Giá — Phân Loại "Đã Biết" vs "Chưa Biết" (5 phút)

Đánh dấu trung thực vào bảng dưới:

| # | Keyword | Đã hiểu? | Tự tin giải thích? | Ghi chú |
|---|---------|----------|-------------------|---------|
| 1 | Context/Token | ☐ | ☐ | |
| 2 | Token | ☐ | ☐ | |
| 3 | Model | ☐ | ☐ | |
| 4 | Hallucination | ☐ | ☐ | |
| 5 | Prompt Engineering | ☐ | ☐ | |
| 6 | Temperature | ☐ | ☐ | |
| 7 | RAG | ☐ | ☐ | |
| 8 | Memory | ☐ | ☐ | |
| 9 | Knowledge Graph | ☐ | ☐ | |
| 10 | Agent | ☐ | ☐ | |
| 11 | MCP | ☐ | ☐ | |
| 12 | PE vs RAG vs FT | ☐ | ☐ | |

---

## ✅ Ngày 0 — Checklist Hoàn Thành

- [ ] Đọc hiểu 12 keywords (bài này)
- [ ] Vẽ/hiểu mindmap 3 nhóm: Nền tảng → Kỹ thuật → Hệ thống
- [ ] Hoàn thành Bài 1: Cảm nhận Token
- [ ] Hoàn thành Bài 2: So sánh Temperature
- [ ] Hoàn thành Bài 3: Prompt Engineering Battle
- [ ] Hoàn thành Bài 4: Bắt Quả Tang Hallucination
- [ ] Hoàn thành Bài 5: Tự đánh giá 12 keywords
- [ ] Ghi 3 điều quan trọng nhất hôm nay đã học

---

## ⏭️ Ngày Mai — Ngày 1: Context Window, Token & Hallucination

Ngày mai sẽ Deep Dive vào 3 keyword đầu tiên (Context, Token, Hallucination) với:
- Lý thuyết chi tiết + code demo tính token
- Bài tập tối ưu prompt để giảm token
- Lab thực hành: so sánh chi phí English vs Vietnamese prompt
