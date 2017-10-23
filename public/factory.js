app.factory('mainFactory', [function () {
    var quotes = {
        quotes: ["keep it up!", "everyday counts!"]
    }
    var user = {
        name: name,
        image: image_url,
        savings: savings,
        currentStreakCounter: currentStreakCounter,
        allTimeBest: { type: Number },
        settings: {
            workoutCost: workoutCost,
            goalFrequency: goalFrequency,
            goalIntervalSetting: goalIntervalSetting,
            streakTarget: streakTarget,
            bonusAmt: bonusAmt,
            targetGiftPrice: targetGiftPrice
        }
    }

    var log = {
    currentStreakCounter: currentStreakCounter,
    savings: user.savings + user.settings.workoutCost,
    workoutCost: user.settings.workoutCost,
    date: date,
    bonusStreakAdded: function () {
        if (user.currentStreakCounter === user.settings.streakTarget) {
            return settings.bonusAmt
        }
        return 0;
    }
}

return quotes, user, log;

}]);
