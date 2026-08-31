# 📅 Ngày 2: Prompt Engineering + Temperature

> ⏱️ Thời lượng: **1.5 giờ**
> 📍 Giai đoạn: LLM Fundamentals (1/4)
> 🎯 Mục tiêu: Viết prompt chính xác + Hiểu Temperature

---

## 📖 Phần 1: Lý Thuyết (35 phút)

### 1.1. Prompt Engineering (25 phút)

**Đọc:** `docs/01-llm-fundamentals/01-prompt-engineering.md`
**Bổ sung:** `sources/duc-cppai.md` — Keyword #5 (Prompt Engineering / System Prompt)

#### 4 kỹ thuật prompt cốt lõi:

| Kỹ thuật | Mô tả | Khi nào dùng |
|----------|-------|-------------|
| **Zero-shot** | Hỏi trực tiếp, không ví dụ | Task đơn giản, rõ ràng |
| **Few-shot** | Đưa 2-5 ví dụ mẫu trước khi hỏi | Classification, format cụ thể |
| **Chain-of-Thought (CoT)** | "Hãy suy nghĩ từng bước" | Logic phức tạp, toán, reasoning |
| **Role Prompting** | Gán vai trò: "Bạn là chuyên gia..." | Chuyên môn hóa câu trả lời |

#### System Prompt

System Prompt là prompt đặc biệt đặt ở đầu hội thoại, quy định "nhân cách" và luật chơi cho AI.

**❌ Bad prompt:**
```
Viết cho tôi một email
```

**✅ Good prompt:**
```
Bạn là chuyên gia marketing B2B, đang viết email follow-up cho 
khách hàng là CEO công ty sản xuất, sau buổi demo sản phẩm AI.
Giọng văn chuyên nghiệp nhưng thân thiện. Email dưới 150 từ, 
có CTA rõ ràng là đặt lịch demo lần 2. Tránh từ khóa spam.
```

### 1.2. Temperature (10 phút)

**Đọc:** `sources/duc-cppai.md` — Keyword #6

Temperature điều chỉnh mức "sáng tạo" của AI:

| Temperature | Hành vi | Phù hợp cho |
|-------------|---------|-------------|
| **0 - 0.3** | Chính xác, nhất quán | Phân tích data, code, dịch thuật |
| **0.4 - 0.7** | Cân bằng | Viết email, tóm tắt, chatbot |
| **0.8 - 1.0+** | Sáng tạo, đa dạng | Brainstorm, viết sáng tạo, đặt tên |

**Quy tắc:** Cần chính xác → Temperature thấp. Cần sáng tạo → Temperature cao.

---

## 💻 Phần 2: Thực Hành (40 phút)

### 2.1. Chạy demo Prompt Engineering trên FE (15 phút)

1. Mở `http://localhost:3000` → Vào bài **Prompt Engineering**
2. Chạy các demo thực hành có sẵn
3. Click **"Behind the Scenes"** → Copy mã → Tìm trong `backend/src/prompt-engineering/`
4. Đọc code backend, chú ý comments có prefix `BUSINESS`

### 2.2. Thực hành viết prompt (25 phút)

**Bài tập 1: Phân loại email** (Zero-shot + Few-shot)

Dùng Google AI Studio hoặc demo trên FE:

```
// Zero-shot
"Phân loại email sau thành: Technical Issue / Sales / General Inquiry
Email: {nội dung email}"

// Few-shot (thêm ví dụ)
"Ví dụ 1: 'Server bị lỗi 500' → Technical Issue
Ví dụ 2: 'Muốn xem bảng giá' → Sales
Ví dụ 3: 'Cảm ơn support team' → General Inquiry
Bây giờ phân loại: {email mới}"
```

**Bài tập 2: Trích xuất CV → JSON** (Role Prompting + CoT)

```
Bạn là chuyên gia HR. Hãy trích xuất thông tin từ CV sau thành JSON:
{
  "name": "...",
  "skills": [...],
  "experience_years": ...,
  "education": "..."
}

Hãy suy nghĩ từng bước:
1. Tìm tên ứng viên
2. Liệt kê kỹ năng
3. Tính số năm kinh nghiệm
4. Trình độ học vấn

CV: [paste đoạn text CV bất kỳ]
```

**Bài tập 3: So sánh Temperature**

Cùng 1 prompt, chạy 3 lần với Temperature khác nhau (0.2, 0.7, 1.0). Quan sát sự khác biệt.

---

## 📝 Phần 3: Củng Cố (15 phút)

### Flashcards (8 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| Zero-shot prompting? | Hỏi AI trực tiếp không cần ví dụ. Dùng cho task đơn giản |
| Few-shot prompting? | Đưa 2-5 ví dụ mẫu trước khi hỏi. Dùng cho classification, format cụ thể |
| Chain-of-Thought? | Bảo AI "suy nghĩ từng bước". Dùng cho logic, toán, reasoning |
| Role Prompting? | Gán vai trò cụ thể. Chuyên môn hóa câu trả lời |
| System Prompt? | Prompt đặc biệt đầu hội thoại, quy định nhân cách + luật chơi cho AI |
| Temperature 0.2? | Chính xác, nhất quán — dùng cho code, phân tích, dịch thuật |
| Temperature 0.8? | Sáng tạo, đa dạng — dùng cho brainstorm, viết sáng tạo |
| Prompt Engineering là gì? | Kỹ thuật thiết kế input để AI hiểu đúng ý, không cần train lại model |

### Feynman (7 phút)

**Giải thích:** "Tại sao cùng 1 câu hỏi nhưng prompt khác nhau cho kết quả khác nhau?"

**Gợi ý:** Liên hệ: Zero-shot (mơ hồ) vs Few-shot (có mẫu) vs CoT (suy luận). Temperature = mức sáng tạo.

---

## ✅ Checklist Ngày 2

- [ ] Hiểu 4 kỹ thuật prompt: Zero-shot, Few-shot, CoT, Role
- [ ] Hiểu System Prompt và cách viết hiệu quả
- [ ] Hiểu Temperature và 3 dải giá trị
- [ ] Chạy demo Prompt Engineering trên FE
- [ ] Hoàn thành 3 bài tập thực hành
- [ ] Đọc code backend `prompt-engineering/` module

---
➡️ Ngày tiếp: [Ngày 3: Structured Output + Streaming](./day-03.md)
