"use strict";
// var paypal = require('../../');
const paypal = require('paypal-rest-sdk');
const express = require('express');
const app = express();
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AWiCry6CMXUKUEPkfTi_esu90eAQor01CDelhVfYS9bSvuJTs__BgTDqmV2utDImXpCEGoktaTiIVg87',
    'client_secret': 'EDIloNPKGfxh958ypUUvyrs3QL3pD49NgTha5NsIlH42FmaTDazyDJ-HaKqQ9E0Hb-BTgdq2zsK6k3GU'
  });
  
//Authorization code from the mobile sdk
var auth_code = {'authorization_code':'C21AAFEnlBGuhASEpShpMqqF8Ni8odKy1GrgGBcEKV0GWDdWBJVZFQS4ZgMz9nbd841eNUUDoPPR_0kdoL-9BO6hqtvanCS7g'};

app.post('/firstTimePayment',(req,res)=>{
    paypal.generateToken(auth_code, function (error, rt) {
        if (error) {
        console.log(error);
        console.log(error.response);
    }  else {
        //Refresh token has long shelf life. It is recommended to store this in a database
        //for future payments
        console.log('rt',rt);
        var refresh_token = rt;
        
        //Client Metadata ID from mobile sdk
        var future_payment_config = {'client_metadata_id': '3774925944a0417bab2de7d9100a767f', 'refresh_token': refresh_token};

        //Set up payment details
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "3.00"
                },
                "description": "This is the payment description."
            }]
        };

        //Create future payment
        paypal.payment.create(create_payment_json, future_payment_config, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(payment);
            }
        });
    }
})
});

app.post('/futurePayment',(req,res)=>{
    var refresh_token = 'R23AAG0gEyXt38T-O8umInbJKSUtEp5DOOdNNYpLn-K575sUO5QCVBOKUhyol7S3LBIYiNb3wzyNoxHLjA4a4rUes_wMqc80MyX4r5-et7uMk4eZI4goCWj2tCOFvxzKl1CqhWTQ209vdXHnC7xwg';

    var future_payment_config = {'client_metadata_id': '3774925944a0417bab2de7d9100a767f', 'refresh_token': refresh_token};

    //Set up payment details
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "4.00"
            },
            "description": "This is the payment description."
        }]
    };

    //Create future payment
    paypal.payment.create(create_payment_json, future_payment_config, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(JSON.stringify(payment));
        }
    });

})
app.listen(3000 ,()=>console.log('Future Payment 3000'))