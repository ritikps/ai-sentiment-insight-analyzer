# AI Insights Dashboard 🚀

A full-stack AI analytics platform built with **React.js, Node.js, Express.js, PostgreSQL, and Google Gemini AI**.

The application provides AI-powered text analysis, sentiment classification, summarization, and persistent PostgreSQL history tracking through a decoupled cloud deployment architecture.

## 🚀 Live Demo

**Frontend:** [Open Live Application](https://ai-sentiment-insight-analyzer-6w27bjgh9.vercel.app/)

**Backend API:** [Open Render Backend](https://ai-sentiment-insight-analyzer.onrender.com)

**GitHub:** [View Source Code](https://github.com/ritikcodes405/ai-sentiment-insight-analyzer)

---

## 📸 Application Preview

![AI Insights Dashboard](assets/demo.png)

---

## 🌟 Key Features

* 🧠 **AI-Powered Text Analysis** — Analyzes user-provided text using Google Gemini AI.
* 📊 **Sentiment Classification** — Classifies text as **Positive, Neutral, or Negative**.
* 📝 **Automatic Summarization** — Generates a concise summary of the submitted text.
* ⚡ **Interactive React Dashboard** — Real-time analysis results with a simple and responsive interface.
* 🗄️ **PostgreSQL Persistence** — Saves analysis history in PostgreSQL.
* 📋 **History Tracking** — Displays the latest saved analysis records.
* 🗑️ **Clear History** — Deletes saved history and resets the database identity sequence.
* 🐳 **Dockerized Application** — Frontend and backend can run together using Docker Compose.
* ☁️ **Cloud Deployment** — Frontend and backend are deployed independently.

---

## 🏗️ Architecture

```text
                         USER
                           |
                           v
                 React + Vite Frontend
                        Vercel
                           |
                           | HTTPS API Requests
                           v
                  Node.js + Express API
                         Render
                      /          \
                     /            \
                    v              v
          PostgreSQL Database     Gemini AI
              Supabase
```

---

## 🛠️ Tech Stack

| Layer                | Technology                         | Platform           |
| -------------------- | ---------------------------------- | ------------------ |
| **Frontend**         | React.js, Vite, JavaScript, CSS3   | **Vercel**         |
| **Backend API**      | Node.js, Express.js, CORS          | **Render**         |
| **Database**         | PostgreSQL, `pg`                   | **Supabase**       |
| **AI Integration**   | Google Gemini API, `@google/genai` | Server-side        |
| **Containerization** | Docker, Docker Compose             | Local / Deployment |
| **Version Control**  | Git, GitHub                        | GitHub             |

---

## 📁 Repository Structure

```text
ai-sentiment-insight-analyzer/
│
├── assets/
│   └── demo.png
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── docker-compose.yml
├── index.html
├── .gitignore
└── README.md
```

---

## 🔄 Application Flow

```text
User enters text
       ↓
React frontend sends API request
       ↓
Node.js + Express backend
       ↓
Google Gemini analyzes the text
       ↓
Sentiment + summary generated
       ↓
Result saved to PostgreSQL
       ↓
Response returned to React
       ↓
Latest Insight displayed
       ↓
History table refreshed
```

---

## 📡 API Endpoints

### Analyze Text

```http
POST /api/analyze
```

Analyzes the submitted text using Gemini AI and stores the result in PostgreSQL.

Example request:

```json
{
  "text": "I really enjoyed this product. The quality is excellent."
}
```

### Get History

```http
GET /api/history
```

Returns the latest saved analysis records.

### Clear History

```http
DELETE /api/history
```

Deletes all saved history records and resets the PostgreSQL identity sequence.

---

## ☁️ Deployment

### Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

**Live URL:**
https://ai-sentiment-insight-analyzer-6w27bjgh9.vercel.app/

### Backend — Render

The Node.js/Express REST API is deployed on Render.

**Backend URL:**
https://ai-sentiment-insight-analyzer.onrender.com

### Database — Supabase

The application uses managed **PostgreSQL on Supabase** for persistent storage.

### AI — Google Gemini

The backend communicates with the Google Gemini API for sentiment analysis and summarization.

---

## 🔐 Environment Variables

The backend uses environment variables for sensitive configuration:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Sensitive credentials are excluded from the repository using `.gitignore`.

---

## 🐳 Docker

The project includes Docker support for running the frontend and backend together.

Start the application:

```bash
docker compose up -d
```

Stop the application:

```bash
docker compose down
```

The local application is available at:

```text
Frontend: http://localhost
Backend:  http://localhost:5000
```

---

## ✅ Project Highlights

* Full-stack React + Node.js application
* REST API development with Express.js
* Google Gemini AI integration
* PostgreSQL database integration
* Docker and Docker Compose
* Cloud deployment with Vercel and Render
* Persistent analysis history
* CRUD-style API interaction
* Production environment configuration
* Git/GitHub version control

---

## 👤 Author

**Ritik Panda**

* **GitHub:** [ritikcodes405](https://github.com/ritikcodes405)
* **Project Repository:** [AI Sentiment Insight Analyzer](https://github.com/ritikcodes405/ai-sentiment-insight-analyzer)

---

## ⭐ Project

**AI Insights Dashboard**
**React.js + Node.js + PostgreSQL + Gemini AI + Docker + Vercel + Render**
