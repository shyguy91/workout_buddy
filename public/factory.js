app.factory('mainFactory', ['$http', function ($http) {
    var workoutObj = {};

    workoutObj.quotes = ["keep it up!", 
                        "everyday counts!", 
                        "There’s no secret formula. I lift heavy, work hard, and aim to be the best.",
                        "If something stands between you and your success, move it. Never be denied." ];

    workoutObj.getUser = function (id){
        return $http.get('/get-user/' + id)
            .then(function(data){return data})
    }

    workoutObj.postUser = function (userObj){
        return $http.post('/post-user', userObj)
            .then(function(data){return data})
    }

    workoutObj.postWorkout = function (userId, logObj){
        return $http.post('/post-workout/' + userId, logObj)
            .then(function(data){return data})
    }

    return workoutObj;
}]);
