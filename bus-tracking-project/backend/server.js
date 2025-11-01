require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const { Server } = require('socket.io');
const sequelize = require('./config/db');
const Bus = require('./models/Bus');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ✅ Connect to MySQL
sequelize.sync()
  .then(() => console.log('✅ MySQL Connected & Tables Synced'))
  .catch(err => console.error('❌ MySQL Connection Error:', err));

// API: get all buses
app.get('/api/buses', async (req, res) => {
  const buses = await Bus.findAll();
  res.json(buses);
});

// API: post location updates
app.post('/api/locations', async (req, res) => {
  try {
    const { busId, routeId, lat, lng, speed, heading } = req.body;
    if (!busId || lat == null || lng == null) return res.status(400).send('Missing fields');

    const [bus, created] = await Bus.upsert({
      busId,
      routeId,
      lat,
      lng,
      speed,
      heading,
      updatedAt: new Date(),
    });

    io.emit('locationUpdate', { busId, lat, lng, speed, heading });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

io.on('connection', (socket) => {
  console.log('🟢 Client connected', socket.id);
  socket.on('disconnect', () => console.log('🔴 Client disconnected', socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
