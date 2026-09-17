const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const balanceRoute = require('./api/balance.js');
const orderRoute = require('./api/order.js');
const nicknameRoute = require('./api/nickname.js');

app.all('/api/balance', (req, res) => balanceRoute(req, res));
app.all('/api/profile', (req, res) => balanceRoute(req, res)); // Tambahan untuk cek profile/saldo
app.all('/api/order', (req, res) => orderRoute(req, res));
app.all('/api/nickname', (req, res) => nicknameRoute(req, res)); // Mengaktifkan fitur nickname

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Toko Kezu menyala di port ${PORT} 🚀`);
});
