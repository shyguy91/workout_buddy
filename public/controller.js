app.controller('mainCtrl', ['$scope', 'mainFactory', function ($scope, mainFactory) {

    var user = {
        name: "",
        image_url: "",
        savings: 0,
        currentStreakCounter: 0,
        allTimeBest: 0,
        settings: {
            workoutCost: 0,
            goalFrequency: 0,
            goalIntervalSetting: "",
            streakTarget: 0,
            bonusAmt: 0,
            targetGiftPrice: 0
        },
        logs: [
            {
                currentStreakCounter: 0,
                savings: 0,
                workoutCost: 0,
                date: 0,
                bonusStreakAdded: 0
            }]
    };
    mainFactory.getUser('59ede79c6800b51fb8b87f35')
        .then(function (data) {
            user = data.data;
            $scope.successionCounter = user.currentStreakCounter;
            $scope.goal = user.settings.goalFrequency + ' time(s) per ' + user.settings.goalIntervalSetting;
            $scope.savings = user.savings;
            $scope.progress = (user.savings / user.settings.targetGiftPrice * 100).toFixed(2) + "%";

            // LOGS //
            $scope.logs = user.logs;
            $scope.name = user.name;
        });

    // PROFILE //
    $scope.quote = mainFactory.quotes[Math.floor(Math.random() * mainFactory.quotes.length)];
    var date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(0);
    $scope.date = date;
    // WorkOut Button
    $scope.workedOut = function () {
        alert("Amazing! Your workout has been logged.")
        var logObj = {
            currentStreakCounter: 0,
            savings: user.savings + user.settings.workoutCost,
            workoutCost: user.settings.workoutCost,
            date: $scope.date,
            bonusStreakAdded: 0};
        switch (user.settings.goalIntervalSetting) {
            case 'week':
                if($scope.date.getDate() - 7 >= user.logs[user.logs.length - 1].date.getDate()
                    && $scope.date.getDate() <= user.logs[user.logs.length - 1].date.getDate() + 13) {
                        logObj.currentStreakCounter = user.currentStreakCounter + 1;
                        if(logObj.currentStreakCounter % user.settings.streakTarget == 0) {
                            logObj.bonusStreakAdded = user.settings.bonusAmt;
                            logObj.savings += user.settings.bonusAmt;
                        }
                    }                
                break;

            default:
                break;
        }
        // Post Log Request
        mainFactory.postLog('59ede79c6800b51fb8b87f35', logObj)
        .then(function (data) { 
            user.logs.push(data.data.logs[data.data.logs.length - 1]);
            user.savings = data.data.logs[data.data.logs.length - 1].savings;
            user.currentStreakCounter = data.data.logs[data.data.logs.length - 1].currentStreakCounter
            if(user.currentStreakCounter > user.allTimeBest) {
                user.allTimeBest = user.currentStreakCounter;
            }
        })
    };

    // SETTINGS //
    $scope.updateSettings = function () {
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