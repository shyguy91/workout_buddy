app.factory('mainFactory', [function(){
    var quotes = ["keep it up!", "everyday counts!"];
    var user = {streakRecord: 3,
        goalFrequency: 1,
        goalSetting: 'week',
        targetGiftPrice: 25,
        savings: 5}
user.quotes = quotes;

return user;
}]);