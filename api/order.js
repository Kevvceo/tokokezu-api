const axios = require('axios');

module.exports = async (req, res) => {
    const API_KEY = process.env.VIPAYMENT_KEY;
    const SIGN = process.env.VIPAYMENT_SIGN;

    const serviceCode = req.body.serviceCode;
    const userId = req.body.userId;
    const zoneId = req.body.zoneId || '';

    if (!serviceCode || !userId) {
        return res.json({ success: false, message: "Data tidak lengkap" });
    }

    try {
        const params = new URLSearchParams();
        params.append('key', API_KEY);
        params.append('sign', SIGN);
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
        res.json({
            success: data.result || false,
            message: data.message || "Terjadi kesalahan",
            trxId: (data.data && data.data.trxid) ? data.data.trxid : ""
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
