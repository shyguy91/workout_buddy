app.controller('mainCtrl', ['$scope', 'mainFactory', function ($scope, mainFactory) {

    // user = mainFactory.getUser(id);
    $scope.main = mainFactory.dummyData = {
        tempId: '59ede79c6800b51fb8b87f35',
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
            }, 
            {
                currentStreakCounter: 3,
                savings: 8,
                workoutCost: 1,
                date: new Date(),
                bonusStreakAdded: 2
            }]
    }
    // PROFILE //
    // Stats
    $scope.successionCounter = mainFactory.dummyData.currentStreakCounter;
    // Goals
    $scope.goal = mainFactory.dummyData.settings.goalFrequency + ' time(s) per ' + mainFactory.dummyData.settings.goalIntervalSetting;
    // Progress
    $scope.progress = mainFactory.dummyData.savings / mainFactory.dummyData.settings.targetGiftPrice * 100 + "%";
    // Motivational Quote
    $scope.quote = mainFactory.quotes[Math.floor(Math.random() * mainFactory.quotes.length)];
    // Date & Time
    var date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    $scope.date = date;
    // WorkOut Button
    $scope.workedOut = function () {
        alert("I worked out!")
        mainFactory.getUser(mainFactory.dummyData.tempId).then(function(data){console.log(data)})
        //post log
        var logObj = {};
        switch (mainFactory.dummyData.settings.goalIntervalSetting) {
            case 'week':
                //if(date.get() == mainFactory.dummyData.logs[mainFactory.dummyData.logs.length - 1].date.getMonth() + 1)                
                break;

            default:
                break;
        }

    };

    // LOGS //
    var currentLog = mainFactory.dummyData.logs[mainFactory.dummyData.logs.length - 1];
    $scope.name = mainFactory.dummyData.name;
    $scope.logDate = currentLog.date;
    $scope.logWorkoutCost = currentLog.workoutCost;
    $scope.logCurrentStreakCounter = currentLog.currentStreakCounter;
    $scope.logSavings = currentLog.savings;
    $scope.logBonusStreakAdded = currentLog.bonusStreakAdded;

    // SETTINGS //
   $scope.updateSettings = function(){
        var settingsObj = {
            workoutCost: $scope.newWorkoutCost,
            goalFrequency: $scope.newGoalFrequency,
            goalIntervalSetting: $scope.newGoalIntervalSetting,
            streakTarget: $scope.newStreakTarget,
            bonusAmt: $scope.newBonusAmt,
            targetGiftPrice: $scope.newTargetGiftPrice
        }
        console.log(settingsObj);
        // post/put update settings
    };
}]);