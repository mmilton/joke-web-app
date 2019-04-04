
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const jokeEndpoints = {
    "nodeLambda": "https://vil8lztmc1.execute-api.us-east-1.amazonaws.com/test/",
    "nodeEC2": "https://111plr0hp0.execute-api.us-east-1.amazonaws.com/testEC2",
    // "javaLambda": "",
    // "javaNode":""
  };

const apiKey = '6d16aa9b8875f217053d9bf317cca203';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {joke: null, error: null});
})

app.post('/', function (req, res) {
  let api = req.body.api;
  let url = jokeEndpoints[api];

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {joke: null, error: 'Error, please try again'});
    } else {
      let jokeFromServer = JSON.parse(body);
      if(jokeFromServer == undefined){
        res.render('index', {joke: null, error: 'Error, please try again'});
      } else {
        let jokeText = Object.keys(jokeFromServer)[0] ;
        let punchline = Object.values(jokeFromServer)[0];
        res.render('index', {joke: jokeText, punchline: punchline, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})