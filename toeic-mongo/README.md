# 🎯 TOEIC AI Agent – MongoDB Atlas Edition

Stack: **FastAPI** + **MongoDB Atlas** + **LangChain** + **LangSmith** + **React**

---

## Cấu trúc

```
toeic-mongo/
├── backend/
│   ├── main.py          ← FastAPI endpoints
│   ├── database.py      ← MongoDB Motor connection + collections
│   ├── auth.py          ← JWT register/login
│   ├── chains.py        ← LangChain AI chains (LangSmith traced)
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── pages/LoginPage.jsx
│   │   ├── components/   ← HomeTab, QuizTab, VocabTab, ChatTab, StatsTab
│   │   ├── hooks/        ← useAuth (JWT), useStats
│   │   └── data/         ← api.js, questions.js
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

---

## Setup MongoDB Atlas (free tier)

### Bước 1: Tạo cluster
1. Vào https://cloud.mongodb.com → **Create account** (free)
2. **Create a deployment** → chọn **M0 Free** → chọn region gần nhất (Singapore)
3. Tạo **Database User**: username + password → nhớ lưu lại
4. **Network Access** → **Add IP Address** → `0.0.0.0/0` (cho phép mọi IP)

### Bước 2: Lấy connection string
1. Clusters → **Connect** → **Drivers**
2. Chọn **Python** → Copy connection string
3. Thay `<password>` bằng password vừa tạo

```
mongodb+srv://toeic_user:YOUR_PASS@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Bước 3: Điền vào .env

```bash
cd backend
cp .env.example .env
# Điền:
#   MONGODB_URL=mongodb+srv://...
#   MONGODB_DB=toeic_agent
#   ANTHROPIC_API_KEY=sk-ant-...
#   LANGCHAIN_API_KEY=ls__...
#   JWT_SECRET=$(python -c "import secrets; print(secrets.token_hex(32))")
```

---

## Chạy với Docker

```bash
# Build & chạy
docker compose up --build

# Chạy nền
docker compose up --build -d

# Xem logs
docker compose logs -f backend
```

→ Frontend: http://localhost  
→ API docs: http://localhost:8000/docs

---

## Chạy local (không Docker)

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # điền keys
uvicorn main:app --reload --port 8000

# Frontend (tab mới)
cd frontend
npm install
npm run dev
```

---

## MongoDB collections

| Collection      | Mô tả                          |
|----------------|--------------------------------|
| `users`         | Tài khoản, XP, streak          |
| `user_stats`    | Accuracy theo từng phần TOEIC  |
| `quiz_sessions` | Lịch sử làm bài                |
| `vocab_history` | Từ vựng đã học qua thơ         |

## LangSmith traces

Vào https://smith.langchain.com → project **toeic-ai-agent**:

| Trace name                | Khi nào |
|--------------------------|---------|
| `agent_analyze`           | Vào trang chủ |
| `session_result_analysis` | Sau quiz |
| `tutor_chat`              | Chat AI |
| `vocab_poem_generator`    | Tạo thơ |
