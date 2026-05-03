# 🐍 The Ouroboros — Smart Greenhouse Dashboard

> A full-stack IoT greenhouse monitoring and control system built by **Team 21210** at Obour STEM School.

![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square)
![AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-blue?style=flat-square)
![SQLite](https://img.shields.io/badge/Database-SQLite-orange?style=flat-square)

---

## 🌿 Overview

The Ouroboros is a mobile-first web dashboard for real-time greenhouse monitoring. It integrates with an **ESP32 microcontroller** to read sensor data, runs a heuristic **XAI engine** for automated alerts, and features **Boro** — an AI assistant powered by Google Gemini.

---

## ✨ Features

- **Live Dashboard** — Real-time Temp, Humidity, Soil Moisture & VPD gauges
- **Interactive Charts** — 30-reading trend graphs with touch/hover crosshair tooltip
- **XAI Alerts** — Explainable AI auto-logs every environmental deviation with reasoning
- **Boro AI 🐍** — In-app chatbot (Gemini 2.5 Flash) with live sensor context
- **Species Library** — Optimal setpoint profiles for Tomato & Bell Pepper across growth stages
- **Control Center** — Toggle actuators (Peltier, Humidifier, Pump) in Auto/Manual mode
- **Emergency Stop** — One-tap full shutdown command
- **Growth Timeline** — Visual stage progress tracker with auto-journal
- **Dark / Light Mode** — Full theme support

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (SPA) |
| Backend | Node.js + Express.js |
| Database | SQLite (via `better-sqlite3`) |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Hardware | ESP32 (sensor POST to `/api/data`) |

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/sohibebehairy-dot/The-Ouroborus.git
cd The-Ouroborus
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Copy `.env.example` to `.env` and add your Gemini API key:
```bash
cp .env.example .env
```
Edit `.env`:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the server
```bash
node server.js
```

### 5. Open the app
Visit `http://localhost:3000` in your browser (use mobile view for best experience).

### Optional: Run mock ESP32 simulator
```bash
node mock_esp32.js
```

---

## 📡 API Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/data` | Receive sensor data from ESP32 |
| `GET` | `/api/data?limit=30` | Fetch last N sensor readings |
| `GET` | `/api/alerts?limit=20` | Fetch XAI alert log |
| `DELETE` | `/api/alerts/clear` | Clear all alerts |
| `POST` | `/api/chat` | Send message to Boro AI |
| `POST` | `/api/command` | Send actuator command |
| `POST` | `/api/setpoints` | Update environment setpoints |

---

## 👥 Team

**Team 21210 — Obour STEM School · Grade 11**

- Moataz
- Mohammed  
- Omar
- Sohibe

---

## 🔒 Security Notes

- Never commit your `.env` file — it is in `.gitignore`
- The `database.sqlite` file is also gitignored (local data only)
- Use `.env.example` as a template for collaborators
