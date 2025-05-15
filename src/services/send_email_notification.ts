
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.PROVIDER as string,
    auth:{
        user:process.env.USER_EMAIL as string,
        pass:process.env.USER_PASSWORD as string
    }
});

export const sendEmailNotification = async(to:string, subject:string, text:string): Promise<any> => {
    await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to,
        subject,
        text
    })

}