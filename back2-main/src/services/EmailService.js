// const nodemailer = require('nodemailer')
// const dotenv = require('dotenv');
// dotenv.config()
// var inlineBase64 = require('nodemailer-plugin-inline-base64');

// const sendEmailCreateOrder = async (email,orderItems) => {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: process.env.MAIL_ACCOUNT, // generated ethereal user
//       pass: process.env.MAIL_PASSWORD, // generated ethereal password
//     },
//   });
//   transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));

//   let listItem = '';
//   const attachImage = []
//   orderItems.forEach((order) => {
//     listItem += `<div>
//     <div>
//       Bạn đã đặt sản phẩm <b>${order.tenSanPham}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.donGia} VND</b></div>
//       <div>Bên dưới là hình ảnh của sản phẩm</div>
//     </div>`
//     attachImage.push({path: order.image})
//   })

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: process.env.MAIL_ACCOUNT, // sender address
//     to: email, // list of receivers
//     subject: "Bạn đã đặt hàng tại Goodnuts", // Subject line
//     text: "Hello world?", // plain text body
//     html: `<div><b>Bạn đã đặt hàng thành công tại Goodnuts</b></div> ${listItem}`,
//     attachments: attachImage,
//   });
// }

// module.exports = {
//   sendEmailCreateOrder
// }

// test
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()

const sendEmailCreateOrder = async (email,orderItems) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",// true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
  
  let listItem = '';
  const attachImage = []
  orderItems.forEach((order) => {
    listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`
    attachImage.push({path: order.image})
  })
  const mailOptions = {
    from: process.env.MAIL_ACCOUNT,
    to: email,
    subject: "Bạn đã đặt hàng tại Goodnuts",
    html: `<div><b>Bạn đã đặt hàng thành công tại Goodnuts</b></div> ${listItem}`,
    attachments: attachImage,
  };
  transporter.sendMail(mailOptions);
  // // send mail with defined transport object
  // let info = await transporter.sendMail({
  //   from: process.env.MAIL_ACCOUNT, // sender address
  //   to: email, // list of receivers
  //   subject: "Bạn đã đặt hàng tại Goodnuts", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: `<div><b>Bạn đã đặt hàng thành công tại Goodnuts</b></div> ${listItem}`,
  //   attachments: attachImage,
  // });
}

module.exports = {
  sendEmailCreateOrder
}