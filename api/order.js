const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try {
    const { serviceCode, userId, zoneId } = req.body;
    if (!serviceCode || !userId) return res.status(400).json({ success: false, message: 'serviceCode dan userId wajib diisi' });

    // API Key disimpan RAHASIA di Vercel Environment Variables
    const API_KEY = process.env.VIPAYMENT_KEY;
    const SIGN    = process.env.VIPAYMENT_SIGN;

    const params = new URLSearchParams({ key: API_KEY, sign: SIGN, type: 'order', service: serviceCode, data_no: userId });
    if (zoneId) params.append('data_zone', zoneId);

    const response = await axios.post('https://vip-reseller.co.id/api/game-feature', params.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 25000
    });

    const data = response.data;
    return res.status(200).json({ success: data.result === true, message: data.message || 'Terjadi kesalahan', trxId: data.data?.trxid || '' });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error: ' + (error.message || 'Unknown') });
  }
};
