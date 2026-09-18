const axios = require('axios');
const crypto = require('crypto');

module.exports = async (req, res) => {
    const API_KEY = process.env.VIPAYMENT_KEY;
    const MERCHANT_ID = process.env.VIPAYMENT_MERCHANT;
    const sign = crypto.createHash('md5').update(API_KEY + MERCHANT_ID).digest('hex');

    const game = req.query.game || (req.body && req.body.game) || '';
    const userid = req.query.userid || (req.body && req.body.userid) || '';
    const zoneid = req.query.zoneid || (req.body && req.body.zoneid) || '';

    if (!game || !userid) {
        return res.json({ result: false, message: "Game dan User ID harus diisi!" });
    }

    try {
        const params = new URLSearchParams();
        params.append('key', API_KEY);
        params.append('sign', sign);
        params.append('type', 'get-nickname');
        params.append('code', game);
        params.append('target', userid);
        params.append('additional_target', zoneid);

        const response = await axios.post(
            'https://vip-reseller.co.id/api/game-feature',
            params.toString(),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        res.json(response.data);
    } catch (error) {
        res.json({ result: false, message: error.message });
    }
};
