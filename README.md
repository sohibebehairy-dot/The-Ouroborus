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

## 📂 Project Structure

```
Prototype/
├── src/
│   ├── main.ino                       # Main program loop
│   ├── soil_moisture_calibration.ino  # Sensor calibration tool
│   ├── sensors.ino                    # Sensor reading functions
│   └── actuators.ino                  # Pump, fan, humidifier control
├── mobile-app/
│   ├── lib/
│   │   ├── screens/                   # Dashboard, alerts, settings screens
│   │   ├── widgets/                   # Reusable UI components
│   │   ├── services/                  # MQTT & API service layer
│   │   └── models/                    # Data models
│   ├── assets/                        # Icons and images
│   └── pubspec.yaml                   # Flutter dependencies
├── config/
│   └── config.h                       # Wi-Fi credentials & thresholds
├── docs/
│   └── wiring_diagram.png             # Hardware wiring reference
└── README.md                          # This file
```

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
```

---

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
