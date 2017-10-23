var app = angular.module('workoutBuddy', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/profile');
    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: '/templates/profile.html',
            controller: 'mainCtrl'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: '/templates/settings.html',
            controller: 'mainCtrl'
        })
        .state('log', {
            url: '/log',
            templateUrl: '/templates/log.html',
            controller: 'mainCtrl'
        })
}]);

// routes: log, settings, main user