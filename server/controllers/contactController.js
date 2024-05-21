const nodemailer = require('nodemailer');
require('dotenv').config();

// Configuração do serviço de email (exemplo com Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendContactMessage = (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `Mensagem de contato de ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Erro ao enviar a mensagem. Tente novamente.' });
    }
    res.status(200).json({ message: 'Sua mensagem foi enviada com sucesso!' });
  });
};
