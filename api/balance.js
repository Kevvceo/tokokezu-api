const axios = require('axios');

module.exports = async (req, res) => {
    const API_KEY = process.env.VIPAYMENT_KEY;
    const SIGN = process.env.VIPAYMENT_SIGN;

    try {
        const params = new URLSearchParams();
        params.append('key', API_KEY);
        params.append('sign', SIGN);

        const response = await axios.post(
            'https://vip-reseller.co.id/api/profile',
            params.toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        res.json(response.data);
    } catch (error) {
        res.json({ result: false, message: error.message });
    }
};
