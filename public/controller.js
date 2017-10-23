app.controller('mainCtrl', ['$scope', 'mainFactory', function($scope, mainFactory){
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
    $scope.workedOut = function(){
        alert("I worked out!")
    };
}]);