# AI Sentiment Insight Analyzer

A full-stack AI-powered web application that analyzes user text, detects sentiment, generates a concise summary, and stores analysis history in PostgreSQL.

## 🚀 Live Demo

**Frontend:** [Open Live Application](YOUR-VERCEL-URL)

**Backend API:** [Render Backend](https://ai-sentiment-insight-analyzer.onrender.com)

## 📌 Overview

AI Sentiment Insight Analyzer is a full-stack application built to demonstrate modern frontend, backend, database, AI, Docker, and cloud deployment skills.

Users can enter feedback, reviews, or any text and receive an AI-generated sentiment and summary. Each analysis is automatically stored in PostgreSQL and displayed in a history table.

The application also includes a **Clear History** feature that removes all saved analysis records.

## ✨ Features

* AI-powered sentiment analysis
* Positive, Neutral, and Negative sentiment detection
* Automatic 2-sentence summary generation
* PostgreSQL history storage
* View latest AI insight
* Saved analysis history table
* Clear entire history with one click
* Responsive React frontend
* REST API using Node.js and Express
* Dockerized backend and frontend
* Cloud deployment using Vercel and Render
* Environment-based configuration for API keys and database credentials

## 🏗️ Architecture

```text
                    User
                     |
                     v
             React + Vite
                Vercel
                     |
                     | HTTPS API
                     v
          Node.js + Express
                Render
               /       \
              /         \
             v           v
      PostgreSQL      Gemini API
       Supabase          AI
```

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API
* CORS

### Database

* PostgreSQL
* Supabase

### AI

* Google Gemini API

### DevOps / Deployment

* Docker
* Docker Compose
* Git
* GitHub
* Vercel
* Render

## 🔌 API Endpoints

### Analyze Text

```http
POST /api/analyze
```

Analyzes the submitted text using Gemini AI and saves the result to PostgreSQL.

Example request:

```json
{
  "text": "I really enjoyed this product. The quality was excellent."
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

Deletes all saved analysis records and resets the database identity sequence.

## 📂 Project Structure

```text
ai-sentiment-insight-analyzer/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── api/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── docker-compose.yml
├── index.html
├── .gitignore
└── README.md
```

## 🐳 Run Locally with Docker

Clone the repository:

```bash
git clone https://github.com/ritikcodes405/ai-sentiment-insight-analyzer.git
```

Move into the project:

```bash
cd ai-sentiment-insight-analyzer
```

Create your environment file inside the backend directory:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Start both frontend and backend:

```bash
docker compose up -d
```

Open:

```text
http://localhost
```

Stop the application:

```bash
docker compose down
```

## 🔐 Environment Variables

The application requires:

```env
GEMINI_API_KEY=
DATABASE_URL=
PORT=5000
```

Sensitive environment variables are intentionally excluded from GitHub using `.gitignore`.

## 🧠 How It Works

```text
User enters text
       ↓
React frontend sends POST request
       ↓
Node.js / Express backend
       ↓
Gemini analyzes sentiment + summary
       ↓
Result saved in PostgreSQL
       ↓
Backend returns saved result
       ↓
React displays latest insight
       ↓
History table refreshes automatically
```

## 🎯 Example

### Input

```text
I am very happy with this application. It is fast, simple to use, and gives useful AI insights.
```

### Output

```text
Sentiment: Positive

Summary:
The user is very satisfied with the application.
They appreciate its speed, simplicity, and useful AI insights.
```

## 📈 Future Improvements

* User authentication
* Analytics dashboard
* Sentiment charts and statistics
* Pagination for large history records
* Automated CI/CD with Jenkins
* Kubernetes deployment
* Advanced ML model integration
* Role-based access control
* Export analysis history as CSV

## 👨‍💻 Author

**Ritik Panda**

GitHub: [ritikcodes405](https://github.com/ritikcodes405)

Repository: [ai-sentiment-insight-analyzer](https://github.com/ritikcodes405/ai-sentiment-insight-analyzer)

## ⭐ Project Highlights

**React + Node.js + PostgreSQL + Gemini AI + Docker + Cloud Deployment**

Built as a practical full-stack AI application demonstrating frontend development, REST APIs, database integration, AI integration, containerization, and deployment.
