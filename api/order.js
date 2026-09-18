const axios = require('axios');
const crypto = require('crypto');

module.exports = async (req, res) => {
    const API_KEY = process.env.VIPAYMENT_KEY;
    const MERCHANT_ID = process.env.VIPAYMENT_MERCHANT;
    const sign = crypto.createHash('md5').update(API_KEY + MERCHANT_ID).digest('hex');

    const serviceCode = req.body.serviceCode;
    const userId = req.body.userId;
    const zoneId = req.body.zoneId || '';

    if (!serviceCode || !userId) {
        return res.json({ success: false, message: "Data tidak lengkap" });
    }

    try {
        const params = new URLSearchParams();
        params.append('key', API_KEY);
        params.append('sign', sign);
        params.append('type', 'order');
        params.append('service', serviceCode);
        params.append('data_no', userId);
        params.append('data_zone', zoneId);

        const response = await axios.post(
            'https://vip-reseller.co.id/api/game-feature',
            params.toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const data = response.data;
        const success = data.result || false;
        const message = data.message || "Terjadi kesalahan";
        const trxId = (data.data && data.data.trxid) ? data.data.trxid : "";

        res.json({
            success: success,
            message: message,
            trxId: trxId
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
