# 📦 Module 05: ⚡ Advanced Topics
Status: ⬜ Pending
Tuần: 8 (6 ngày học)
Prerequisites: Module 04 (Production)

## 🎯 Mục Tiêu Học Tập
Sau module này, bạn sẽ:
- [ ] Xử lý được multi-modal: Image (Vision), Audio (Whisper, TTS), Video
- [ ] Hiểu khi nào nên/không nên fine-tune
- [ ] Setup được local model với Ollama
- [ ] So sánh được local vs cloud models

## 📅 Lịch Học Chi Tiết

### Ngày 36: Multi-modal AI — Vision + Audio
📖 *Đọc + Demo*
- [ ] Đọc `docs/06-advanced/01-multimodal.md`
- [ ] Hiểu Vision: GPT-4 Vision vs Claude 3.5 Vision
- [ ] Hiểu Audio Input: Whisper (Speech-to-Text)
- [ ] Hiểu Audio Output: OpenAI TTS vs ElevenLabs
- [ ] Chạy demo multi-modal trong source code
- **Từ khóa:** GPT-4 Vision, Whisper, TTS, ElevenLabs, base64

### Ngày 37: Multi-modal — Video + Pipeline hoàn chỉnh
🎯 *Deep Dive + Build*
- [ ] Hiểu Video Understanding: extract frames → analyze
- [ ] Đọc code Complete Multi-modal Pipeline (meeting recording)
- [ ] Feynman: "Multi-modal mở rộng AI app như thế nào?"
- **Mục tiêu:** Hiểu full pipeline: Video → Audio → Transcribe → Vision → Summarize

### Ngày 38: Fine-tuning & Custom Models
📖 *Đọc + Phân tích*
- [ ] Đọc `docs/06-advanced/02-fine-tuning.md`
- [ ] 🆕 Đọc lại bảng so sánh **Prompt Engineering vs RAG vs Fine-tuning** từ `sources/duc-cppai.md` (Keyword #12)
  - PE: Thấp nhất, thử trước — 90% nhu cầu giải quyết được
  - RAG: Trung bình, khi cần dữ liệu riêng
  - Fine-tuning: Cao nhất, chỉ khi PE + RAG không đủ
- [ ] Nắm chắc: ✅ Khi nào NÊN fine-tune vs ❌ Khi nào KHÔNG
- [ ] Hiểu format dataset JSONL, validation rules
- [ ] Đọc code fine-tune GPT-3.5 (upload → train → evaluate)
- [ ] Hiểu LoRA: efficient training cho Llama
- **Từ khóa:** Fine-tune, JSONL, LoRA, Axolotl, n_epochs, Evaluation, PE vs RAG vs Fine-tuning

### Ngày 39: Local Models & Privacy
📖 *Đọc + Setup*
- [ ] Đọc `docs/06-advanced/03-local-models.md`
- [ ] Hiểu ưu/nhược điểm local vs cloud
- [ ] Nắm hardware requirements (7B=8GB, 13B=16GB, 70B=80GB)
- [ ] Hiểu 3 tools: Ollama, llama.cpp, vLLM
- [ ] Hiểu Quantization: Q4 vs Q8 vs FP16
- [ ] Thử setup Ollama nếu có GPU (optional)
- **Từ khóa:** Ollama, llama.cpp, vLLM, Quantization, GGUF, VRAM

### Ngày 40: Ôn tập Module 5 — Flashcards
🃏 *Flashcards + Feynman*
- [ ] Tạo flashcards 12 khái niệm Advanced
- [ ] Feynman: "Fine-tuning khác gì RAG? Khi nào chọn cái nào?"
- [ ] Feynman: "Tại sao cần local models khi đã có GPT-4?"
- [ ] Ôn flashcards Module 3, 4 (Spaced Repetition)

### Ngày 41: Quiz Module 5
📝 *Quiz + Checkpoint*
- [ ] Quiz 10 câu: Multi-modal, Fine-tuning decisions, Local models
- [ ] Target: ≥ 70%
- [ ] Review câu sai

## ✅ Checklist Module
- [ ] Hiểu multi-modal pipeline (Vision + Audio + Video)
- [ ] Biết khi nào nên/không nên fine-tune
- [ ] Hiểu local model options và trade-offs
- [ ] Đạt ≥70% quiz

---
➡️ Module tiếp: [Module 06: 🏆 Tổng Ôn & Project](./module-06-final-review.md)
