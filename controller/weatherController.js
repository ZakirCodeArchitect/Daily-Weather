const axios = require('axios');
const { error } = require('winston');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const getUpdates = async(req,res) => {
    
    const url = "https://www.7timer.info/bin/astro.php?lon=73.084488&lat=33.738045&ac=0&unit=metric&output=json&tzshift=0";
    
    try {
        
        const urlData = await axios.get(url);
        const data = urlData.data;

        const messageBody = `JSON Data: \n${JSON.stringify(data,null,2)}`;

        // Extract relevant information
        if (data && data.dataseries) {
            const weatherData = data.dataseries.map( info => ({
                
                temperature: info.temp2m,
                rain: info.prec_type

            }));
            data.dataseries.forEach(info => {
                
                console.log(`Temperature: ${info.temp2m}°C` );
                console.log(`Rain: ${info.prec_type} `);
                console.log('_____________________')
            })
            
            res.json({
                success:true,
                message: "Weather Prediction details fetched successfully",
                data: weatherData
            })

        } else {
            res.status(404).json({
                success: false,
                message: 'No data available in the API.'
            })
        }

        // sending email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'webdeveloper.zakir152@gmail.com',
                pass: 'tmoj ebmu ovhw upos'
            }
        });

        if (data && data.dataseries) {
            const weatherData = data.dataseries.map( info => ({
                
                temperature: info.temp2m,
                rain: info.prec_type

            }));
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: process.env.RECIPIENT_EMAIL,
                subject: 'JSON Data',
                text: 'Here is the JSON data',
                html: `<pre>${JSON.stringify(weatherData,null,2)}</pre>`
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent : ${info.response}`);
        } else {
            res.status(404).json({
                success: false,
                message: 'No data available in the API.'
            })
        }

        // const mailOptions = {
        //     from: process.env.SENDER_EMAIL,
        //     to: process.env.RECIPIENT_EMAIL,
        //     subject: 'JSON Data',
        //     text: 'Here is the JSON data',
        //     html: `<pre>${JSON.stringify(data,null,2)}</pre>`
        // };

        // const info = await transporter.sendMail(mailOptions);
        // console.log(`Email sent : ${info.response}`);

        // sending SMS:

        // code: P3VDZRW1QJ2MN3NC7MH2UTBA
        const accountSid = process.env.ACCOUNT_SID;
        const authToken = process.env.AUTH_TOKEN;
        const client = twilio(accountSid, authToken);

        const smsInfo = await client.messages.create({
            body: messageBody,
            from: '+923171339788',
            to: '+923336706119'
        });

        console.log(`SMS sent: ${smsInfo.sid}`);
        
        sendEmailWithJSON(url);

    }catch(error)
    {
        res.status(404).json({
            success: false,
            message: 'Error fetching weather predictions.',
            error: error.message,
        })
    }
}

module.exports = { getUpdates }
