const axios = require('axios');
const crypto = require('crypto');

module.exports = async (req, res) => {
    const API_KEY = "ys4l4K9xYsY6JeyWxCuECbizvxzhfkjR7Kp5oesvLgKFGIlXLZSf86aL4wsMckMi";
    const MERCHANT_ID = "fNsuSlfW";
    const sign = crypto.createHash('md5').update(API_KEY + MERCHANT_ID).digest('hex');
    
    const game = req.query.game || req.body.game;
    const userid = req.query.userid || req.body.userid;
    const zoneid = req.query.zoneid || req.body.zoneid || '';

    try {
        const response = await axios.post('https://vip-reseller.co.id/api/game-feature', new URLSearchParams({
            key: API_KEY, sign: sign, type: 'get-nickname', code: game, target: userid, additional_target: zoneid
        }));
        res.json(response.data);
    } catch (error) {
        res.json({ result: false, message: error.message });
    }
};
