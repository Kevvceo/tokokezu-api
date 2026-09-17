const express = require('express');
const cors = require('cors');
const app = express();

// Izinkan aplikasi Android mengakses API ini
app.use(cors());
app.use(express.json());

// Hubungkan ke file API Vercel kamu
const balanceRoute = require('./api/balance.js');
const orderRoute = require('./api/order.js');

// Jika nanti ada nickname.js, tambahkan di sini juga
// const nicknameRoute = require('./api/nickname.js');

app.all('/api/balance', (req, res) => balanceRoute(req, res));
app.all('/api/order', (req, res) => orderRoute(req, res));

// app.all('/api/nickname', (req, res) => nicknameRoute(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Toko Kezu menyala di port ${PORT} 🚀`);
});
