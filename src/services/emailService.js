require('dotenv').config();
import nodemailer from 'nodemailer';


let sendSimpleEmail = async (dataSend) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });


        const info = await transporter.sendMail({
            from: '"Email from DTinh 👻" <duytinh1083@gmail.com>', // sender address
            to: dataSend.receiverEmail, // list of receivers
            subject: "Thông tin đặt lịch khám bệnh", // Subject line
            text: "Hello world?", // plain text body
            html: `
                <h3>Xin chào ${dataSend.patientNAme}</h3>
                <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care</p>
                <p>Thông tin đặt lịch khám bệnh: </p>
                <div><b>Thời gian: ${dataSend.time}</b></div>
                <div><b>Thời gian: ${dataSend.doctorName}</b></div>
                <p>Nếu các thông tin trên là đúng sự thật, vui long click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
                <div>
                    <a href="${dataSend.redirectLink} target="_blank">Click here</a>
                </div>
                <div>Xin chân thành cảm ơn</div>
            `, // html body
        });
    } catch (e) {
        console.log(e)
    }
}




module.exports = {
    sendSimpleEmail
}