const express = require('express');
const path = require('path');
const port = process.env.PORT || 3030;
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(express.static(__dirname + '/'));

app.use(cors());

app.get('/getQuote', (req, res) => {
  axios.get("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json").then(data => {
    res.json(data);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});
app.listen(port);
console.log("Server Started " + port);
