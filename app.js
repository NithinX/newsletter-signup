const express = require('express');
const https = require('https')
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){
    res.sendFile(__dirname + '/signup.html');
})

app.post('/',function(req,res){

    const data ={
        members:[
            {
                email_address: req.body.email,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.Fname,
                    LNAME: req.body.Lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url ="https://us14.api.mailchimp.com/3.0/lists/5aead6cdae";

    const options = {
        method: "POST",
        auth: "nithinX:4734da84accd491742b7ded708a5b358-us14"
    }

    const request = https.request(url, options, function(response){
        response.on("data", function (data) {
            console.log(JSON.parse(data));
          })
    })
    
    request.write(jsonData);
    request.end();

    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");     
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    
})

app.post('/failure',function(req,res){
    res.redirect('/');
})

app.listen(port,function () {
    console.log("Server started on port "+port);
  })
