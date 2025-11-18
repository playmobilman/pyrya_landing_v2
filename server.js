const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/api/send', async (req, res) => {
  const { email } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: 'matias@pyrya.com',
      subject: 'Nuevo lead Pyrya',
      text: `Correo registrado: ${email}`
    });

    res.send('¡Gracias! Te mantendremos al tanto.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Hubo un error enviando el correo.');
  }
});

app.listen(3000, () => console.log('Landing Pyrya corriendo en puerto 3000'));
