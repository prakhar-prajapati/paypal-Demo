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

app.post('/refund',(req,res)=>{

    var data = {
        "amount": {
        "currency": "USD",
        "total": "1.00"
    }
},
saleId = "85H50712G5626732S";

paypal.sale.refund(saleId, data, function (error, refund) {
    if (error) {
        throw error;
    } else {
        console.log("Refund Sale Response");
        console.log(JSON.stringify(refund));
    }

});
})

app.listen(3000 ,()=>console.log('Refund Payment 3000'))