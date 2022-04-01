const nodemailer = require('nodemailer');

const nodeMailSender = (userEmail,mailSubject,mailMessage) => {

    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth : {
            user : process.env.USER_ID,
            pass : process.env.USER_PASSWORD
        }
    })

    const mail_options = {
        from : process.env.USER_ID,
        to : userEmail,
        subject : mailSubject,
        html : mailMessage
    }

    transport.sendMail(mail_options,function(err,info){
        if(err){
            console.log(err);
        }else{
            console.log(`Mail Sent to : ${userEmail}`);
        }
        transport.close();
    })

}

module.exports = nodeMailSender