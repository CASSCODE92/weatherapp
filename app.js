const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
// to parse through the body of the post request

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");



});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiID = "9d5ef555915fcd2730d0246940a5d247";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiID + "&units=" + unit;

    https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherInfo = JSON.parse(data)
        const temp = weatherInfo.main.temp
        // tapped into the main object because the value lives
        // in temp key
        const weatherDescription = weatherInfo.weather[0].description
        const icon = weatherInfo.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/10d" + icon + "@2x.png"
        res.write("<p>The weather is currently " + weatherDescription + "<p>");
        res.write("<h2>The temperature in " + query + " is" + temp + "degrees Fahrenheight.</h2>");
        res.write("<img src=" + imageURL + ">");
        res.send()

})
})



})





app.listen(3000,function() {
  console.log("Server is running on port 3000.");
})
