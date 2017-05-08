'use strict';
const nodemailer = require('nodemailer');

function sendConfirmationEmail(email, orderId) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'DotP.Store@gmail.com',
          pass: process.env.EMAIL_KEY
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"No Reply - DotP Store" <DotP.Store@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Order #' + orderId + ' has been submitted', // Subject line
      //text: 'Thank you for supporting Defense of the Patience.\n You can check the status of your order here.', // plain text body
      html: '<b>Thank you for supporting Defense of the Patience.</b></br> <b><a href="https://www.defenseofthepatience.com/orders/' + orderId + '">Check Order Status</a></b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

console.log("INSIDE EMAIL SVC")
//emailIt()

module.exports = {
  sendConfirmationEmail
}
