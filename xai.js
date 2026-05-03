const { dbRun } = require('./database');

// Current setpoints (mocked, but could be pulled from DB)
const setpoints = {
  tempMax: 28,
  tempMin: 20,
  humMin: 55,
  soilMin: 50
};

// Keeps track of the last time an alert was fired to prevent spam
let lastAlertTimes = {
  temp: 0,
  hum: 0,
  soil: 0
};

const COOLDOWN_MS = 60000; // 1 minute cooldown per alert type

async function evaluateData(data) {
  const now = Date.now();
  const { temperature, humidity, soil_moisture } = data;
  
  // 1. High Temperature Alert
  if (temperature > setpoints.tempMax && (now - lastAlertTimes.temp > COOLDOWN_MS)) {
    lastAlertTimes.temp = now;
    const title = `Temp reached ${temperature.toFixed(1)}°C`;
    const explanation = `Temperature exceeded setpoint by ${(temperature - setpoints.tempMax).toFixed(1)}°C. Ambient heat is high. Peltier and Fan activated to reduce thermal load.`;
    await dbRun(
      'INSERT INTO alerts (title, explanation, severity, tags) VALUES (?, ?, ?, ?)',
      [title, explanation, 'danger', 'Fan ON, Peltier ON']
    );
  }

  // 2. Low Humidity Alert
  if (humidity < setpoints.humMin && (now - lastAlertTimes.hum > COOLDOWN_MS)) {
    lastAlertTimes.hum = now;
    const title = `Dry Air — RH at ${humidity.toFixed(0)}%`;
    const explanation = `Humidity dropped ${Math.abs(humidity - setpoints.humMin).toFixed(0)}% below target. Humidifier activated to restore optimal air moisture levels.`;
    await dbRun(
      'INSERT INTO alerts (title, explanation, severity, tags) VALUES (?, ?, ?, ?)',
      [title, explanation, 'info', 'Humidifier ON']
    );
  }

  // 3. Low Soil Moisture Alert
  if (soil_moisture < setpoints.soilMin && (now - lastAlertTimes.soil > COOLDOWN_MS)) {
    lastAlertTimes.soil = now;
    const title = `Soil moisture dropped to ${soil_moisture.toFixed(0)}%`;
    const explanation = `Soil is dry, likely due to high evaporation. Water Pump activated to hydrate the root zone.`;
    await dbRun(
      'INSERT INTO alerts (title, explanation, severity, tags) VALUES (?, ?, ?, ?)',
      [title, explanation, 'warn', 'Pump ON']
    );
  }
}

module.exports = { evaluateData, setpoints };
