const http = require('http');

let t = 26;
let h = 60;
let s = 60;

function vpd(temp, hum) {
  const svp = 0.6108 * Math.exp(17.27 * temp / (temp + 237.3));
  return Math.max(0, svp - hum / 100 * svp);
}

function randWalk(v, lo, hi, step) {
  return Math.min(hi, Math.max(lo, v + (Math.random() - 0.5) * step));
}

function sendData() {
  t = randWalk(t, 22, 34, 1.0); // Make it jump a bit more to trigger alerts
  h = randWalk(h, 40, 80, 2.5);
  s = randWalk(s, 38, 80, 2.0);
  const v = vpd(t, h);

  const payload = JSON.stringify({
    temperature: t,
    humidity: h,
    soil_moisture: s,
    vpd: v
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/data',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', chunk => responseData += chunk);
    res.on('end', () => {
      console.log(`[${new Date().toLocaleTimeString()}] Sent Data: Temp=${t.toFixed(1)}, Hum=${h.toFixed(1)}, Soil=${s.toFixed(1)}. Server replied:`, responseData);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(payload);
  req.end();
}

console.log("Starting Mock ESP32. Sending data every 5 seconds...");
setInterval(sendData, 5000);
sendData();
