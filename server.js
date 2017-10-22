var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/workoutBuddy');

// var Workout = require("./workoutModel");

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var handler = function(res, next){
    return function(err, workout) {
      if (err) {
        return next(err);
      }
      res.send(workout);
    }
  }



// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});


// app.all('*', function(req, res) {
//     res.sendFile("angular-routing/public/index.html")
//   })
  
  
  
  app.listen(8000, function() {
    console.log("yo yo yo, on 8000!!")
  });