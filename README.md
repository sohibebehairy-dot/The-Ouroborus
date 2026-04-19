# The-Ouroborus
# 🌿 SMART Greenhouse

---

## 📖 Project Description

The **SMART Greenhouse** is an IoT-based automated plant monitoring and control system built around the **ESP32 microcontroller**. It continuously reads environmental data — soil moisture, temperature, humidity, and light levels — and responds intelligently to keep your plants in their ideal growing conditions, with or without human intervention.

Whether you're growing vegetables, herbs, or ornamental plants, this system takes the guesswork out of plant care by giving you **real-time data**, **automated responses**, and **remote monitoring** — all in one compact, low-cost setup.

---

## 🚀 Features

- 💧 **Soil Moisture Monitoring** — Uses a Capacitive Soil Moisture Sensor v1.2 with ADC calibration to accurately measure soil wetness and trigger irrigation automatically.
- 🌡️ **Temperature & Humidity Sensing** — Reads ambient conditions via a DHT22 sensor and activates fans or heaters to maintain the optimal microclimate.
- ☀️ **Light Level Detection** — Monitors natural light with an LDR and controls grow lights to ensure plants always get enough light, day or night.
- 🚿 **Automatic Irrigation** — A relay-controlled water pump activates only when the soil is too dry, saving water and preventing overwatering.
- 📡 **Wi-Fi Connectivity** — The ESP32 connects to your local network and can send sensor data to a dashboard, MQTT broker, or cloud platform.
- 📊 **Real-Time Serial Dashboard** — A clean, readable Serial Monitor output lets you observe all sensor readings live during development and testing.
- 🔧 **Easy Calibration** — Built-in calibration mode for the soil moisture sensor ensures accurate readings tailored to your specific soil type.

---

## 🛠️ Hardware Used

| Component | Purpose |
|---|---|
| ESP32 Dev Board | Main microcontroller & Wi-Fi |
| Capacitive Soil Moisture Sensor v1.2 | Soil wetness measurement |
| DHT22 Sensor | Temperature & humidity |
| LDR (Light Dependent Resistor) | Ambient light level |
| 5V Relay Module | Controls water pump & grow lights |
| Mini Water Pump | Automated irrigation |
| Grow Light / LED Strip | Supplemental plant lighting |
| 5V Power Supply | Powers the system |

---

## ⚡ How It Works

1. 🌱 **Sense** — Sensors continuously sample soil moisture, air temperature, humidity, and light every few seconds.
2. 🧠 **Decide** — The ESP32 compares readings against configurable thresholds (e.g., "if soil moisture < 30%, turn on pump").
3. ⚙️ **Act** — Relays switch the pump, fan, heater, or grow lights on/off automatically.
4. 📶 **Report** — Data is sent over Wi-Fi to a dashboard or MQTT broker for remote monitoring and logging.

---

## 📂 Project Structure

```
SMART-Greenhouse/
├── src/
│   ├── main.ino                  # Main program loop
│   ├── soil_moisture_calibration.ino  # Sensor calibration tool
│   ├── sensors.ino               # Sensor reading functions
│   └── actuators.ino             # Pump, fan, light control
├── config/
│   └── config.h                  # Wi-Fi credentials & thresholds
├── docs/
│   └── wiring_diagram.png        # Hardware wiring reference
└── README.md                     # This file
```

---

## 🔌 Wiring Overview

```
ESP32 GPIO34  ──→  Soil Moisture Sensor (AOUT)
ESP32 GPIO4   ──→  DHT22 Data Pin
ESP32 GPIO35  ──→  LDR Analog Out
ESP32 GPIO26  ──→  Relay IN1 (Water Pump)
ESP32 GPIO27  ──→  Relay IN2 (Grow Light)
ESP32 3.3V    ──→  Sensors VCC
ESP32 GND     ──→  Common Ground
```

---

## ⚙️ Configuration

Open `config/config.h` and set your parameters:

```cpp
// Wi-Fi
#define WIFI_SSID       "YourNetworkName"
#define WIFI_PASSWORD   "YourPassword"

// Thresholds
#define MOISTURE_DRY_THRESHOLD   30.0   // % — pump turns ON below this
#define MOISTURE_WET_THRESHOLD   60.0   // % — pump turns OFF above this
#define TEMP_MAX_THRESHOLD       30.0   // °C — fan turns ON above this
#define LIGHT_MIN_THRESHOLD      400    // ADC — grow light ON below this

// Calibration (from your calibration run)
#define MOISTURE_DRY_VALUE       2750
#define MOISTURE_WET_VALUE       1200
```

---

## 📋 Getting Started

1. **Clone** this repository to your local machine.
2. **Install** the Arduino IDE and add ESP32 board support.
3. **Install libraries**: `DHT sensor library`, `Adafruit Unified Sensor`, `PubSubClient` (for MQTT).
4. **Wire** the hardware following the wiring overview above.
5. **Run** `soil_moisture_calibration.ino` first to calibrate your sensor.
6. **Update** `config.h` with your Wi-Fi credentials and calibrated values.
7. **Upload** `main.ino` to your ESP32 and open Serial Monitor at 115200 baud.
8. 🌿 **Watch your greenhouse take care of itself!**

---

## 📡 Data & Monitoring

The system publishes sensor readings to an **MQTT broker** every 10 seconds in JSON format:

```json
{
  "soil_moisture": 45.3,
  "temperature": 24.7,
  "humidity": 62.1,
  "light_level": 512,
  "pump_state": "OFF",
  "light_state": "ON"
}
```

You can visualise this data using **Node-RED**, **Home Assistant**, **Grafana**, or any MQTT-compatible dashboard.

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
