const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&Api=9d5ef555915fcd2730d0246940a5d247"

  https.get(url, function(response)){
    console.log(response);
  }

  res.send("Server is up and running.")
})





app.listen(3000,function() {
  console.log("Server is running on port 3000.");
})
