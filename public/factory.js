app.factory('mainFactory', [function () {
    var workoutObj = {};

    workoutObj.dummyData = {
        _id: 12345,
        name: "Shy",
        image_url: "https://vignette3.wikia.nocookie.net/nintendo/images/e/e1/ShyGuy.PNG/revision/latest?cb=20110929231546&path-prefix=en",
        savings: 5,
        currentStreakCounter: 2,
        allTimeBest: 4,
        settings: {
            workoutCost: 1,
            goalFrequency: 1,
            goalIntervalSetting: "week",
            streakTarget: 3,
            bonusAmt: 2,
            targetGiftPrice: 30
        },
        logs: [
            {
                currentStreakCounter: 2,
                savings: 5,
                workoutCost: 1,
                date: new Date(),
                bonusStreakAdded: 0
            }]
    }

    workoutObj.quotes = ["keep it up!", "everyday counts!"];
    // var user = {
    //     name: name,
    //     image: image_url,
    //     savings: savings,
    //     currentStreakCounter: currentStreakCounter,
    //     allTimeBest: { type: Number },
    //     settings: {
    //         workoutCost: workoutCost,
    //         goalFrequency: goalFrequency,
    //         goalIntervalSetting: goalIntervalSetting,
    //         streakTarget: streakTarget,
    //         bonusAmt: bonusAmt,
    //         targetGiftPrice: targetGiftPrice
    //     }
    // }

    // var log = {
    //     currentStreakCounter: currentStreakCounter,
    //     savings: user.savings + user.settings.workoutCost,
    //     workoutCost: user.settings.workoutCost,
    //     date: date,
    //     bonusStreakAdded: function () {
    //         if (user.currentStreakCounter === user.settings.streakTarget) {
    //             return settings.bonusAmt
    //         }
    //         return 0;
    //     }
    // }

    return workoutObj;

}]);
