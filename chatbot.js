require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { dbAll } = require('./database');

const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;
let model = null;

if (apiKey && apiKey !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
}

async function handleChat(message) {
  if (!model) {
    return "Error: Gemini API Key is not configured. Please add it to your .env file.";
  }

  try {
    // Fetch latest sensor data to provide context to the AI
    const latestData = await dbAll('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 1');
    const latestAlerts = await dbAll('SELECT * FROM alerts ORDER BY timestamp DESC LIMIT 3');
    
    let contextStr = "You are 'Boro' 🐍, the AI assistant for 'The Ouroboros' smart greenhouse project built by Team 21210 (Moataz, Mohammed, Omar, Sohibe) at Obour STEM School. You are smart, concise, and friendly. You have deep knowledge of hydroponics, plant science, and IoT automation.\n";
    
    if (latestData.length > 0) {
      const d = latestData[0];
      contextStr += `Current Live Data: Temp ${d.temperature.toFixed(1)}°C, Humidity ${Math.round(d.humidity)}%, Soil Moisture ${Math.round(d.soil_moisture)}%, VPD ${d.vpd.toFixed(2)}.\n`;
    } else {
      contextStr += "Current Live Data: No data available right now.\n";
    }

    if (latestAlerts.length > 0) {
      contextStr += "Recent System Alerts:\n";
      latestAlerts.forEach(a => {
        contextStr += `- ${a.title}: ${a.explanation}\n`;
      });
    }

    const prompt = `${contextStr}\nUser Message: ${message}\n\nRespond as Boro. Be concise and helpful (under 3 sentences unless a detailed explanation is requested). Use the live data if relevant. You may use an occasional emoji to feel friendly but don't overdo it.
If the user asks you to control an actuator (turn on/off the fan, peltier, pump, humidifier, or switch to manual/auto mode), append a command to the VERY END of your response in this exact format:
[CMD:toggle_actuator:p:true] (where p=peltier/fan, h=humidifier, w=pump, and state is true/false)
[CMD:switch_mode:auto] (or manual)
[CMD:emergency_stop]
Example: "I am turning on the pump for you right now. 💧 [CMD:toggle_actuator:w:true]"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Chat API error:", error);
    return "Sorry, I encountered an error communicating with the AI service.";
  }
}

module.exports = { handleChat };
