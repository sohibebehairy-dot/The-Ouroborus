<<<<<<< HEAD
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
=======
# 🐍 The-Ouroborus
## An IoT-Based Automated Greenhouse System Supported by a Mobile Application that Enables Live Monitoring of Temperature, Humidity, and Soil Moisture to Enhance Plant Growth

---

## 📖 Project Description

The **Ouroborus** is an IoT-based automated plant monitoring and control system built around the **ESP32 microcontroller**. It continuously reads environmental data — soil moisture, temperature, humidity, and light levels — and responds intelligently to keep your plants in their ideal growing conditions, with or without human intervention.

Whether you're growing vegetables, herbs, or ornamental plants, this system takes the guesswork out of plant care by giving you **real-time data**, **automated responses**, and **remote monitoring** — all in one compact, low-cost setup.

---

## 🚀 Features

- 💧 **Soil Moisture Monitoring** — Uses a Capacitive Soil Moisture Sensor v1.2 with ADC calibration to accurately measure soil wetness and trigger irrigation automatically.
- 🌡️ **Temperature & Humidity Sensing** — Reads ambient conditions via a DHT22 sensor and activates fans or heaters to maintain the optimal microclimate.
- 🚿 **Automatic Irrigation** — A relay-controlled water pump activates only when the soil is too dry, saving water and preventing overwatering.
- 📡 **Wi-Fi Connectivity** — The ESP32 connects to your local network and sends sensor data to the mobile app in real time.
- 📱 **Mobile Application** — A dedicated app lets you monitor all sensors, control actuators, and receive alerts from anywhere.
- 🔧 **Easy Calibration** — Built-in calibration mode for the soil moisture sensor ensures accurate readings tailored to your specific soil type.

---

## 🛠️ Hardware Used

| Component | Purpose |
|---|---|
| ESP32 Dev Board | Main microcontroller & Wi-Fi |
| Capacitive Soil Moisture Sensor v1.2 | Soil wetness measurement |
| DHT22 Sensor | Temperature & humidity |
| 5V Relay Module | Controls water pump & grow lights |
| Mini Water Pump | Automated irrigation |
| Grow Light / LED Strip | Supplemental plant lighting |
| 5V/1A & 12V/5A | Powers the system |

---

## ⚡ How It Works

1. 🌱 **Sense** — Sensors continuously sample soil moisture, air temperature, and humidity every few seconds.
2. 🧠 **Decide** — The ESP32 compares readings against configurable thresholds (e.g., "if soil moisture < 30%, turn on pump").
3. ⚙️ **Act** — Relays switch the pump, fan, or humidifier on/off automatically.
4. 📶 **Report** — Data is sent over Wi-Fi to the mobile app for remote monitoring, control, and alerts.

---

## 🔌 Wiring Overview

```
ESP32 GPIO34  ──→  Soil Moisture Sensor (AOUT)
ESP32 GPIO4   ──→  DHT22 Data Pin
ESP32 GPIO26  ──→  Relay IN1 (Water Pump)
ESP32 GPIO27  ──→  Relay IN2 (Humidifer)
ESP32 3.3V    ──→  Sensors VCC
ESP32 GND     ──→  Common Ground
ESP32 VIN     ──→  Pump's VCC  
```

---

## 📱 Mobile Application

The Ouroborus web-based mobile app is built with **Flutter**, making it available on  **Android**. It connects to the ESP32 via **MQTT** over Wi-Fi, giving you full visibility and control from anywhere.

### ✨ App Features

- 📊 **Live Dashboard** — Real-time cards showing soil moisture %, temperature, humidity, and light level, updating every few seconds.
- 🎛️ **Manual Override** — Toggle the water pump and grow lights on/off directly from the app, overriding automatic mode when needed.
- 🔔 **Push Notifications** — Instant alerts when a sensor crosses a critical threshold (e.g., soil too dry, temperature too high).
- 📈 **Historical Charts** — Line graphs showing sensor trends over the past 24 hours, 7 days, or 30 days.
- ⚙️ **Threshold Settings** — Customize automation thresholds (moisture %, temp °C, light level) directly from the app — no re-uploading code needed.
- 🌐 **Remote Access** — Works over local Wi-Fi or remotely via a cloud MQTT broker (e.g., HiveMQ, Mosquitto).
- 🌙 **Dark & Light Mode** — Clean, plant-themed UI available in both dark and light themes.

### 📲 App Screens

| Screen | Description |
|---|---|
| 🏠 Dashboard | Live sensor readings and system status at a glance |
| 💧 Irrigation | Pump status, manual control, and watering history |
| 🌡️ Climate | Temperature & humidity trends and fan/heater control |
| ☀️ Lighting | Light level graph and grow light schedule settings |
| 🔔 Alerts | Notification history and threshold configuration |
| ⚙️ Settings | Wi-Fi, MQTT broker config, and calibration values |

### 🔧 App Tech Stack

| Layer | Technology |
|---|---|
| Framework | Flutter (Dart) |
| Connectivity | MQTT (`mqtt_client` package) |
| Charts | `fl_chart` package |
| Notifications | Firebase Cloud Messaging (FCM) |
| State Management | Provider / Riverpod |
| Local Storage | `shared_preferences` |

### 📡 Data Format

The app receives JSON payloads from the ESP32 over MQTT every 10 seconds:

```json
{
  "soil_moisture": 45.3,
  "temperature": 24.7,
  "humidity": 62.1,
  "pump_state": "OFF",
  "humidfier": "ON"
}
>>>>>>> 245e573a35a4b39f909c032e716871b1f4343a02
```

---

<<<<<<< HEAD
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
=======
## 🌍 Use Cases

- 🏠 Home herb & vegetable gardens
- 🌺 Ornamental plant collections
- 🧪 Agricultural research & prototyping
- 🏫 STEM education projects
- 🌾 Small-scale precision farming experiments

---

## 🤝 Contributing

Contributions, ideas, and improvements are welcome! Feel free to open an issue or submit a pull request. Let's grow something great together. 🌱

---

## 📜 License

This project is open-source under the **MIT License** — free to use, modify, and share.

---

> *"Give a plant the right conditions, and it will thrive. Give a developer the right tools, and so will they."* 🌿
>>>>>>> 245e573a35a4b39f909c032e716871b1f4343a02
