const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const balanceRoute = require('./api/balance.js');
const orderRoute = require('./api/order.js');
const nicknameRoute = require('./api/nickname.js');
const notifyRoute = require('./api/notify.js');

app.all('/api/balance', (req, res) => balanceRoute(req, res));
app.all('/api/profile', (req, res) => balanceRoute(req, res));
app.all('/api/order', (req, res) => orderRoute(req, res));
app.all('/api/nickname', (req, res) => nicknameRoute(req, res));
app.post('/api/notify', (req, res) => notifyRoute(req, res)); // Fitur kirim notif

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Toko Kezu menyala di port ${PORT} 🚀`);
});
