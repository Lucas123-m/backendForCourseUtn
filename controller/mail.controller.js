const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require("ejs")
const fs = require("fs")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'benny.bradtke83@ethereal.email',
        pass: 'UEbA829cjGTcjhTzt4'
    },
});

exports.sendEmail = async (req, res) => {
    const { name, email, message } = req.body;
  
    const templatePath = path.join(
      __dirname,
      '../public/views/ejs/welcome.ejs'
    );
  
    const source = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = ejs.compile(source)
  
    const htmlContent = compiledTemplate({ name, email, message });
  
    const mailOptions = {
      from: 'no-reply@anime.com',
      to: email,
      subject: 'Gracias por tu mensaje',
      html: htmlContent,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.send('Correo enviado exitosamente 🚀');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Ocurrió un error al enviar el correo ❌');
    }
  };
  