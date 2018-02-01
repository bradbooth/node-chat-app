const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname + '/../public'); //Build a nice looking path
const PORT = process.env.PORT || 3000;
var app = express(); //Initialize express

app.use(express.static(publicPath)); //The directory for express to use
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
}); //Port to listen on
