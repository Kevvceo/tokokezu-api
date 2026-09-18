const axios = require('axios');

module.exports = async (req, res) => {
    const API_KEY = process.env.VIPAYMENT_KEY;
    const SIGN = process.env.VIPAYMENT_SIGN;

    const game = req.query.game || (req.body && req.body.game) || '';
    const userid = req.query.userid || (req.body && req.body.userid) || '';
    const zoneid = req.query.zoneid || (req.body && req.body.zoneid) || '';

    if (!game || !userid) {
        return res.json({ result: false, message: "Game dan User ID harus diisi!" });
    }

    try {
        const params = new URLSearchParams();
        params.append('key', API_KEY);
        params.append('sign', SIGN);
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
