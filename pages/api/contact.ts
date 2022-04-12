import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

interface Data {}

const pass = process.env.EMAIL_PASSWORD;
const user = process.env.EMAIL;
const to = process.env.TARGET_EMAIL;

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user,
    pass,
  },
  secure: true,
});

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    if (name && email && message) {
      const mail = {
        from: email,
        to,
        subject: `Message From ${name} email:${email}`,
        text: message,
        html: `
                <h5>Contact Email: ${email}</h5>
                <b/>
                <h5>From: ${name}</h5>
                <p>${message}</p>
                `,
      };
      transporter.sendMail(mail, (err) => {
        res.status(200);
        if (err) {
          res.status(500);
        }
      });
    } else {
      res.status(400);
    }
  } else {
    res.status(400);
  }
  res.send(String());
}
