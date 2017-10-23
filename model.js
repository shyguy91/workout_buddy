var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
  currentStreakCounter: { type: Number },
  savings: { type: Number },
  workoutCost: { type: Number },
  date: Date,
  bonusStreakAdded: { type: Number }
});

var workoutSchema = new mongoose.Schema({

  name: { type: String },
  image_url: { type: String },
  savings: { type: Number },
  currentStreakCounter: { type: Number },
  allTimeBest: { type: Number },
  settings: {
    workoutCost: { type: Number },
    goalFrequency: { type: Number },
    goalIntervalSetting: { type: String },
    streakTarget: { type: Number },
    bonusAmt: { type: Number },
    targetGiftPrice: { type: Number }
  },
  logs: [logSchema]
});


var Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;