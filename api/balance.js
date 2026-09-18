const axios = require('axios');
const crypto = require('crypto');

module.exports = async (req, res) => {
    const API_KEY = "ys4l4K9xYsY6JeyWxCuECbizvxzhfkjR7Kp5oesvLgKFGIlXLZSf86aL4wsMckMi";
    const MERCHANT_ID = "fNsuSlfW";
    const sign = crypto.createHash('md5').update(API_KEY + MERCHANT_ID).digest('hex');

    try {
        const params = new URLSearchParams();
        params.append('key', API_KEY);
        params.append('sign', sign);

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
