require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbRun, dbAll } = require('./database');
const { evaluateData } = require('./xai');
const { handleChat } = require('./chatbot');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files (like index.html)

const PORT = process.env.PORT || 3000;

// =======================
// ESP32 API Endpoints
// =======================

// ESP32 posts data here
app.post('/api/data', async (req, res) => {
  try {
    const { temperature, humidity, soil_moisture, vpd } = req.body;
    
    // Insert into DB
    await dbRun(
      'INSERT INTO sensor_data (temperature, humidity, soil_moisture, vpd) VALUES (?, ?, ?, ?)',
      [temperature, humidity, soil_moisture, vpd]
    );

    // Run Heuristic XAI engine on the new data
    await evaluateData(req.body);

    res.status(200).json({ success: true, message: 'Data logged' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// =======================
// Frontend API Endpoints
// =======================

// Get recent sensor data for dashboard
app.get('/api/data', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 30;
    const rows = await dbAll('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT ?', [limit]);
    res.status(200).json(rows.reverse()); // Send chronologically
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get recent XAI alerts
app.get('/api/alerts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const rows = await dbAll('SELECT * FROM alerts ORDER BY timestamp DESC LIMIT ?', [limit]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });
    
    const reply = await handleChat(message);
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chat API error' });
  }
});

// Manual Control Endpoint
app.post('/api/command', (req, res) => {
  const { command, payload } = req.body;
  console.log(`[ESP32 COMMAND PENDING] ${command} ->`, payload);
  // Here we would push this to MQTT or ESP32
  res.status(200).json({ success: true, message: 'Command received' });
});

// Setpoints Endpoint
app.post('/api/setpoints', (req, res) => {
  const { source, setpoints } = req.body;
  console.log(`[ESP32 SETPOINTS PENDING] Source: ${source} ->`, setpoints);
  // Here we would push this to MQTT or ESP32
  res.status(200).json({ success: true, message: 'Setpoints updated' });
});

// Clear all alerts
app.delete('/api/alerts/clear', async (req, res) => {
  try {
    await dbRun('DELETE FROM alerts');
    res.status(200).json({ success: true, message: 'All alerts cleared' });
  } catch(err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Ouroboros Server is running on http://localhost:${PORT}`);
});
