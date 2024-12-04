const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Konfigurasi transporter Nodemailer untuk SMTP Hostinger
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465, // Port untuk SSL
    secure: true, // Gunakan SSL
    auth: {
        user: 'testing@sendemail.moontonofficial.site', // Ganti dengan email Anda
        pass: 'Kontol69', // Ganti dengan password email Anda
    },
});

// Endpoint untuk mengirim email
app.post('/send-email', (req, res) => {
    const { senderName, senderEmail, recipientEmail, subject, message } = req.body;

    // Setup email data
    const mailOptions = {
        from: `"${senderName}" <${senderEmail}>`, // Nama pengirim di email
        to: recipientEmail, // Email penerima
        subject: subject, // Subjek email
        text: message, // Isi pesan
    };

    // Mengirim email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Gagal mengirim email' });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ success: true, message: 'Email berhasil dikirim!' });
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
