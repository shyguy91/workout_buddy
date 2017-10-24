app.controller('mainCtrl', ['$scope', 'mainFactory', function ($scope, mainFactory) {

    $scope.user = {
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

    $scope.progress = ($scope.user.savings / $scope.user.settings.targetGiftPrice * 100).toFixed(2) + "%";
    mainFactory.getUser("59eef4cf045f38594370f162")
        .then(function (data) {
            $scope.user = data.data;            
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
            currentStreakCounter: $scope.user.currentStreakCounter,
            savings: $scope.user.savings + $scope.user.settings.workoutCost,
            workoutCost: $scope.user.settings.workoutCost,
            date: $scope.date,
            bonusStreakAdded: 0
        };
        switch ($scope.user.settings.goalIntervalSetting) {
            case 'week':
                if($scope.user.logs.length == 0){
                    break;
                }
                var lastLogDate = new Date($scope.user.logs[$scope.user.logs.length - 1].date);
                if ($scope.date.getDate() - 7 >= lastLogDate.getDate()
                    && $scope.date.getDate() <= lastLogDate.getDate() + 13) {
                    logObj.currentStreakCounter++;
                    if (logObj.currentStreakCounter % $scope.user.settings.streakTarget == 0) {
                        logObj.bonusStreakAdded = $scope.user.settings.bonusAmt;
                        logObj.savings += $scope.user.settings.bonusAmt;
                    }
                }
                else if($scope.date.getDate() > lastLogDate.getDate() + 13) {
                    logObj.currentStreakCounter = 0;
                }
                break;

            default:
                break;
        }
        // Post Workout Request
        mainFactory.postWorkout("59eef4cf045f38594370f162", logObj)
            .then(function (data) {
                console.log(data)
                $scope.user.logs.push(data.data.logs[data.data.logs.length - 1]);
                $scope.user.savings = data.data.logs[data.data.logs.length - 1].savings;
                $scope.user.currentStreakCounter = data.data.logs[data.data.logs.length - 1].currentStreakCounter
                if ($scope.user.currentStreakCounter > $scope.user.allTimeBest) {
                    $scope.user.allTimeBest = $scope.user.currentStreakCounter;
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

    // WishList //
    $scope.tbd = function(){alert('Work in progress TBD')
                // mainFactory.postUser({"name" : "Shy","image_url" : "https://vignette3.wikia.nocookie.net/nintendo/images/e/e1/ShyGuy.PNG/revision/latest?cb=20110929231546&path-prefix=en","savings" : 7,"currentStreakCounter" : 2,"logs" : [],"settings" : {"workoutCost" : 1,"goalFrequency" : 1,"goalIntervalSetting" : "week","streakTarget" : 3,"bonusAmt" : 2,"targetGiftPrice" : 30}})
                // .then(function(data){
                //     console.log(data);
                // })
            };
}]);