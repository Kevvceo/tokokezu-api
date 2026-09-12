import crypto from 'crypto';

export default async function handler(req, res) {
  // Hanya terima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Ambil secret dari Environment Variable Vercel
  const apiKey = process.env.VIPAYMENT_KEY;
  const apiSign = process.env.VIPAYMENT_SIGN;

  if (!apiKey || !apiSign) {
    return res.status(500).json({ success: false, message: 'API Key atau Sign belum disetting di Vercel.' });
  }

  try {
    // Parameter wajib dari VIPAYMENT
    const params = new URLSearchParams();
    params.append('key', apiKey);
    params.append('sign', apiSign);

    // Hit ke VIPAYMENT
    const response = await fetch('https://vip-reseller.co.id/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    const data = await response.json();

    if (data.result) {
      res.status(200).json({ 
        success: true, 
        balance: data.data.balance,
        name: data.data.name
      });
    } else {
      res.status(400).json({ success: false, message: data.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
