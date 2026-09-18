const admin = require('firebase-admin');

// Inisialisasi Firebase Admin
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (e) {
        console.error("Firebase Admin Error:", e);
    }
}

module.exports = async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.json({ success: false, message: "Title dan Body harus diisi" });
    }

    try {
        // Kirim notifikasi ke semua pengguna (topic: all_users)
        const response = await admin.messaging().send({
            topic: "all_users",
            notification: {
                title: title,
                body: body
            },
            android: {
                priority: "high",
                notification: {
                    sound: "default"
                }
            }
        });

        res.json({ success: true, message: "Notifikasi terkirim!", id: response });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
