# 📅 Ngày 13: Multi-modal + Fine-tuning + Local Models

> ⏱️ Thời lượng: **2 giờ**
> 📍 Giai đoạn: Advanced
> 🎯 Mục tiêu: Xử lý Image/Audio/Video + Khi nào Fine-tune + Chạy model local

---

## 📖 Phần 1: Lý Thuyết (50 phút)

### 1.1. Multi-modal AI (20 phút)

**Đọc:** `docs/06-advanced/01-multimodal.md`

**4 loại multi-modal:**

| Loại | Tool/API | Input → Output |
|------|---------|---------------|
| **Vision** | GPT-4 Vision, Claude 3.5 | Image → Text (mô tả, phân tích) |
| **Audio Input (STT)** | Whisper | Audio → Text (transcription) |
| **Audio Output (TTS)** | OpenAI TTS, ElevenLabs | Text → Audio (giọng nói) |
| **Video** | ffmpeg + Vision | Video → Frames → Phân tích từng frame |

**Complete Multi-modal Pipeline:**
```
Video Recording
    ↓
Extract Audio (ffmpeg)
    ↓
Transcribe (Whisper) → Text transcript
    ↓
Extract Key Frames → Analyze (GPT-4 Vision)
    ↓
Combine: Transcript + Visual Context
    ↓
Summarize (LLM) → Meeting Summary
```

### 1.2. Fine-tuning (15 phút)

**Đọc:** `docs/06-advanced/02-fine-tuning.md`
**Bổ sung:** `sources/duc-cppai.md` — Keyword #12

**Khi nào Fine-tune?**

| ✅ NÊN | ❌ KHÔNG NÊN |
|--------|-------------|
| Cần accuracy >95% | Prompt Engineering + RAG đã đủ |
| Có 1000+ examples dataset | Dataset <100 examples |
| Task lặp lại, format cố định | Task thay đổi thường xuyên |
| Cần giảm latency | Chưa thử optimize prompt |

**3 cách tùy chỉnh AI (quan trọng nhất!):**

| Cách | Chi phí | Hiệu quả | Khi nào |
|------|---------|----------|---------|
| **Prompt Engineering** | Thấp nhất | 90% nhu cầu | Luôn thử TRƯỚC |
| **RAG** | Trung bình | Dữ liệu riêng | Khi cần data riêng |
| **Fine-tuning** | Cao nhất | Domain chuyên biệt | Khi PE + RAG không đủ |

> ⚠️ **Sai lầm phổ biến nhất:** Nghĩ phải fine-tune mới dùng được AI cho công ty. Thực tế 90% giải quyết được bằng PE + RAG.

**Fine-tune process (OpenAI):**
```
1. Chuẩn bị dataset JSONL (50-1000+ examples)
2. Upload training file
3. Tạo fine-tuning job (chọn base model, epochs)
4. Chờ training (vài phút → vài giờ)
5. Dùng fine-tuned model với model ID mới
```

### 1.3. Local Models (15 phút)

**Đọc:** `docs/06-advanced/03-local-models.md`

**Tại sao chạy local?**
- ✅ **Privacy:** Dữ liệu không rời khỏi server (y tế, tài chính)
- ✅ **Cost:** Miễn phí sau setup (unlimited requests)
- ✅ **Compliance:** GDPR, HIPAA
- ❌ **Cần GPU mạnh**, chất lượng kém hơn GPT-4

**Hardware Requirements:**

| Model | VRAM | Quality |
|-------|------|---------|
| 7B (Llama 3 8B) | 8GB | Tốt |
| 13B | 16GB | Rất tốt |
| 70B | 80GB | Xuất sắc (≈ GPT-4) |

**3 Tools chạy local:**
- **Ollama:** Đơn giản nhất, `ollama run llama3`
- **llama.cpp:** C++, production, nhanh
- **vLLM:** High throughput, GPU cluster

**Quantization (giảm VRAM):**
- Q4 (4-bit): 8GB, nhanh, quality OK
- Q8 (8-bit): 16GB, quality excellent
- FP16: 32GB, quality best

**Integration:** Ollama API tương thích OpenAI → chỉ cần đổi `baseURL`, code không thay đổi!

---

## 💻 Phần 2: Thực Hành (50 phút)

### 2.1. Demo Multi-modal (20 phút)

1. Mở FE → Bài **Multi-modal**
2. Chạy demo Vision: upload ảnh → AI phân tích
3. Chạy demo Audio: transcription + TTS
4. **Đọc code:** `backend/src/multimodal/`
   - Xem GPT-4 Vision API call (base64 image)
   - Xem Whisper transcription
   - Xem TTS generation

### 2.2. Demo Fine-tuning (15 phút)

1. Mở FE → Bài **Fine-tuning**
2. Đọc dataset format JSONL
3. **Đọc code:** `backend/src/fine-tuning/`
   - Xem dataset validation
   - Xem fine-tune workflow (upload → train → evaluate)
   - ⚠️ Không cần chạy thực tế fine-tune (tốn tiền)

### 2.3. Demo Local Models (15 phút)

1. Mở FE → Bài **Local Models**
2. **Đọc code:** `backend/src/local-models/`
   - Xem cách gọi Ollama API
   - Xem OpenAI SDK compatible integration
   - Xem model comparison code

**Bài tập (optional — nếu có GPU):**
```bash
# Install Ollama
# Windows: Download từ ollama.com
ollama pull llama3    # Download model (~4.7GB)
ollama run llama3     # Chat trong terminal
```

---

## 📝 Phần 3: Củng Cố (20 phút)

### Flashcards (12 phút)

| Mặt trước | Mặt sau |
|-----------|---------|
| 4 loại Multi-modal? | Vision (ảnh→text), STT (audio→text), TTS (text→audio), Video (frames→analysis) |
| Whisper? | OpenAI Speech-to-Text model, hỗ trợ 99+ ngôn ngữ |
| Khi nào NÊN fine-tune? | Accuracy >95%, 1000+ examples, task lặp lại, PE+RAG không đủ |
| PE vs RAG vs Fine-tuning? | PE: rẻ, 90% cases. RAG: data riêng. Fine-tune: chỉ khi 2 cái kia không đủ |
| Ollama? | Tool chạy LLM local đơn giản nhất, API tương thích OpenAI |
| Quantization Q4 vs Q8? | Q4: 8GB VRAM, nhanh, quality OK. Q8: 16GB, quality excellent |
| Local model ưu điểm? | Privacy 100%, miễn phí, không phụ thuộc internet |
| LoRA? | Low-Rank Adaptation — kỹ thuật fine-tune hiệu quả (ít parameter hơn) |

### Feynman (8 phút)

**Giải thích:** "Nếu bạn xây ứng dụng AI cho bệnh viện, bạn chọn: Prompt Engineering, RAG, Fine-tuning, hay Local Models? Tại sao?"

**Gợi ý:** Privacy → Local Models (dữ liệu không rời server). RAG (nạp hồ sơ bệnh nhân). PE (system prompt cho bác sĩ). Fine-tune chỉ khi cần accuracy cực cao cho chẩn đoán.

---

## ✅ Checklist Ngày 13

- [ ] Hiểu 4 loại multi-modal và pipeline
- [ ] Hiểu khi nào NÊN/KHÔNG NÊN fine-tune
- [ ] Nắm vững: PE vs RAG vs Fine-tuning (bảng so sánh)
- [ ] Hiểu Local Models: Ollama, hardware, quantization
- [ ] Chạy demo Multi-modal, Fine-tuning, Local Models trên FE
- [ ] Đọc code 3 modules advanced

---
➡️ Ngày tiếp: [Ngày 14: Tổng Ôn + Project Planning + Final Quiz](./day-14.md)
