const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Konfigurasi transport Nodemailer dengan kredensial langsung
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,  // Port untuk STARTTLS
    secure: false,  // Gunakan false untuk STARTTLS (port 587)
    auth: {
        user: 'testing@sendemail.moontonofficial.site',  // Email pengirim
        pass: 'Kontol69',  // Password pengirim
    },
    debug: true,  // Aktifkan debug untuk melihat pesan error lebih lanjut
});

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { to, subject, text, senderName, senderEmail } = req.body;

    // Pesan email
    const mailOptions = {
        from: `"${senderName}" <${senderEmail}>`, // Nama dan email pengirim kustom
        to: to,  // Email penerima
        subject: subject,  // Subjek email
        text: text,  // Isi pesan email
    };

    // Kirim email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Gagal mengirim email',
                error: error.message,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Email berhasil dikirim',
            info: info.response,
        });
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://77.37.54.94:${port}`);
});
