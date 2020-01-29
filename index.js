//jshint esversion: 6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const port = 3000;

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {//The next thing to do is we need to be up to get the data that the user chooses from these dropdown list into our server. So as always we're going to be using body posture.
  console.log(req.body.crypto);//this means that we can receive that data inside here and we'll be able to use it to send to the Bitcoin averages service in order to get the relevant pieces of data that we want.
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;
  // var finalUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD";
  // var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";


  
  // var finalUrl = baseUrl + crypto + fiat;
  
  // request(finalUrl, (error, response, body) => {
  //   // console.log(body);
  //   var data = JSON.parse(body);
  //   var price = data.last;
  //   console.log(price);
  //   // res.send("<h1>the current price of " + crypto + "is" + price + fiat + "</h1>");
  //   // res.send("<h1>the current price of bitcoin is " + price + " USD</h1>");
  //   var currentDate = data.display_timestamp;

  //   res.write("<p>The current date is" + currentDate + "</p>");
  //   res.write("<h1>the current price of " + crypto + "is" + price + fiat +"</h1>");

  //   res.send();
    
  // });

  // Calls with parameters
  var baseUrl = "https://apiv2.bitcoinaverage.com/convert/global";

  var options = {//bu asagidaki keyler install ettigimiz request in docs dan aliyoruz
    url: baseUrl,
    method: 'GET',
    qs: {//bu asagidaki keyler ise bitcoin api dan geliyor
      from: crypto,
      to: fiat,
      amount: amount
    }
  };
  request(options, (error, response, body) => {
    var data = JSON.parse(body);
    var price = data.price;
    console.log(price);
    // res.send("<h1>the current price of " + crypto + "is" + price + fiat + "</h1>")
    var currentDate = data.time;

    res.write("<p>The current date is" + currentDate + "</p>");
    res.write("<h1>" + amount + crypto + "is currently worth" + price + fiat +"</h1>");

    res.send();
    
  });
});

app.listen(port, () => {
  console.log(`server is running on port  ${port}`);
});