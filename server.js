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
  Workout.findById(req.params.id ,handler(res,next));
});

//  req.params  is for the id to use the id to find the user in the database on page load

app.post("/post-workout/:userId", function(req, res, next){
  var workoutId = req.params.userId;
  var logToBeSaved = req.body;
      Workout.findById(workoutId, function(err, workout){
      workout.logs.push(logToBeSaved); // push log
      // update user data
      workout.currentStreakCounter = logToBeSaved.currentStreakCounter;
      workout.savings = logToBeSaved.savings;
      workout.allTimeBest = logToBeSaved.allTimeBest;

      workout.save();
      res.send(workout)
  });
});

app.post("/post-user", function(req, res, next){
      Workout.create(req.body, function(err, user){
        res.send(user);
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