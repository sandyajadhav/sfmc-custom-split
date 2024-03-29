'use strict';

const Path = require('path');
const Pkg = require(Path.join(__dirname, '..', 'package.json'));
const express = require('express');

const axios = require('axios');


var mung = require('express-mung');

var util = require('util');

const app = express();
var qs = require('querystring');

var router = express.Router();
var count = 0;

var Request = require("request");

var bodyParser = require('body-parser')//add this

app.post(bodyParser())//add this before any route or before using req.body
require("tls").DEFAULT_ECDH_CURVE = "auto"
var http = require('http-debug').http;
http.debug = 2;
app.use(mung.json(
    function transform(body, req, res) {
        console.log('info', {Message:'API REQUEST RESPONSE LOG',  responseBody:JSON.stringify(body)});
        return body;
    }
));

app.use(require('body-parser').raw({
	type: 'application/jwt'
}));

app.post('/journeybuilder/seg/execute', async function(req, res){
    console.log('Request Token from SFMC : ' + req.body.toString());
    console.log("Headers: "+JSON.stringify(req.headers));
    count += 1;
    if (count % 2 == 0) {
        console.log('Execute method: Success1');

         res.status(200).json({branchResult: 'Success'});

    } else {
        console.log('Execute method: Failure1');
         res.status(200).json({branchResult: 'Failure'});
    }
});


 app.post('/journeybuilder/p13n/execute', async function(req, res) {
    console.log('Request Token from SFMC : ' + req.body.toString());
    console.log("Headers: "+JSON.stringify(req.headers));
    let headerJson = JSON.stringify(req.headers);
    count = count+1;
    let url = "https://sfmc-customactivity-l3.ancestry.com/journeybuilder/p13n/execute";
    if (count % 2  ==1){
        console.log("redirected url")
        req.headers["singularityheader"] ="appId=788*ctrlguid=1552885233*acctguid=c6f9028b-9792-49f7-a36f-01b2bd8101dc*ts=1564192432837*btid=87532*snapenable=True*guid=93f65009-1c49-4db8-9343-fd29e3f51bcd*exitguid=676*unresolvedexitid=0*cidfrom=1885*etypeorder=HTTP*esubtype=HTTP*cidto={[UNRESOLVED][3575001]}";
        res.redirect(307,url);
        console.log("Redirected: Response code "+res.statusCode);
        console.log("Redirected: Response "+res.body);
        

       /*let resspone = await  axios({
        method: 'post',
        url: "https://sfmc-customactivity-l3.ancestry.com/journeybuilder/p13n/execute",
        data: req.body,
        headers: req.headers
    })
   .then(function (response) {
       //handle success
       console.log(response);
       res.headers= response.headers;
       return res.status(response.status).send(response.data);

   })
   .catch(function (response) {
       //handle error
       console.log(response);
   }) */


    }else {
        
        console.log("Started sleeping")
       await work(30000);
        console.log('30 seconds later');

        let resspone = await  axios({
            method: 'post',
            url: "https://sfmc-customactivity-l3.ancestry.com/journeybuilder/p13n/execute",
            data: req.body,
            requestCert: true,
            headers: {
                'Content-Type': 'application/jwt'
             }
        })
       .then(function (response) {
           //handle success
           console.log(response);
           res.headers= response.headers;
           return res.status(response.status).send(response.data);

       })
       .catch(function (response) {
           //handle error
           console.log(response);
       })

    
      //await work();
        /*console.log("Forwarded url")

        let headerscontent = "{\"content-type\":\"application/jwt\",\"cache-control\":\"no-cache\"}";
        await Request.post({
                               "url": "https://sfmc-customactivity-l3.ancestry.com/journeybuilder/p13n/execute",
                               "body": req.body,
                               headers: req.headers
                           }, (error, response, body) => {
            if (error) {
                return console.log(error);
            }
            //res = response;
            console.log(response.body);
            console.log("Status: " + response.statusCode);
            console.log("Response Headers: " + JSON.stringify(response.headers));
        res.set({
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': '26',
            'Connection': 'keep-alive',
            'X-Powered-By':'Express',
            'Set-Cookie':'nlbi_1188888=IhC3L6TWs2HVxLuV6JpqOQAAAACI7/0uZRfhkP2ikZWSLh1d; path=/, incap_ses_133_1188888=gPACJK07VGYeYiJ1tIPYAc5bO10AAAAAWyRtBqZDs40MK+7DzG97Ug==; path=/',
            'ETag':'W/"1a-VTlzGzwcLhk9KUNKz8N70oWTIHI"',
            'X-Response-Time':'0.5849949999999999',
            'X-Iinfo':'8-89248908-89248974 NNNN CT(72 135 0) RT(1564171214208 225) q(0 0 2 -1) r(3 3) U6',
            'X-CDN':'Incapsula'
         })         
            res.status(response.statusCode).send(response.body);
        });

        */
    }
});


/*    count= count +1;
    logData(req);
    console.log('p13n api is called');


    res.on('finish', function () {
        console.log("Body: "+res.body);
    });

    let url = "https://sfmc-customactivity-l2.ancestry.com/journeybuilder/p13n/execute";
    if (count % 2  ==0){
        // res.redirect(307,url);

/!*
      let resspone = await  axios({
                 method: 'post',
                 url: url,
                 data: req.body,
                 config: { headers: {'Content-Type': 'application/jwt' }}
             })
            .then(function (response) {
                //handle success
                console.log(response);
                return response;

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });*!/



    }else
{

    let resspone = await  axios({
                                    method: 'get',
                                    url: "wwww.google.com",
                                    data: "",
                                    config: { headers: {'Content-Type': 'application/json' }}
                                })
        .then(function (response) {
            //handle success
            console.log(response);
            return response;
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });*/

/*});*/


function logData(req) {
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function work(ms) {

    await sleep(ms);
}

app.post(/\/journeybuilder\/(save|publish|validate)/, (req, res) => {
    console.log('Save2, publish and validate is called!');
    return res.status(200).json({success: true});
});

app.use(express.static(Path.join(__dirname, '..', 'public')));

app.listen(process.env.PORT || 12345, () => {
    console.log('customsplit backend is now running!');

});


