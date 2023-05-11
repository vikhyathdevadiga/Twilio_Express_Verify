const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()

app.get('/verify', (request, response) => {
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken =  process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    client.verify.v2
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({ to: process.env.TO_NUMBER, channel: "sms" })
        .then((verification) => {
            response.type('application/json').send({
                success: true,
                code: verification.code,
                status: verification.status,
                message: verification.message,
            });
        })
        .catch((error) => {
            response.type('application/json').send({
                success: false,
                code: error.code,
                status: error.status,
                message: error.message,
            });
        })
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})