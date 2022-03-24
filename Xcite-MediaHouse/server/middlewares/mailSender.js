const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const OAuth2 = google.auth.OAuth2
const OAuth2_client = new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET);

OAuth2_client.setCredentials({refresh_token : process.env.REFRESH_TOKEN});

const nodeMailSender = (userEmail,mailSubject,mailMessage) => {
    const accessToken =  OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            type : 'OAuth2',
            user : process.env.USER_ID,
            clientId : process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
            refreshToken : process.env.REFRESH_TOKEN,
            accessToken :accessToken
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