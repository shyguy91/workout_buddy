var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/workoutBuddy');

var Workout = require("./model");

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var handler = function (res, next) {
  return function (err, workout) {
    if (err) {
      return next(err);
    }
    res.send(workout);
  }
}

app.get("/get-user/:id", function (req, res, next) {
  console.log(req.params.id);
  Workout.findById(req.params.id ,handler(res,next));
});

app.post("/post-log/:userId", function(req, res, next){
  var workoutId = req.params.userId;
  var logToBeSaved = req.body;
  console.log(workoutId)
  console.log(logToBeSaved) 

      Workout.findById(workoutId, function(err, workout){
      workout.logs.push(logToBeSaved);
      workout.save();
      res.send(workout)
  });
});

app.all('*', function (req, res) {
  res.sendFile(__dirname + "/public/index.html")
})


// error handler to catch 404 and forward to main error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});