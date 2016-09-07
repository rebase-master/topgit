var tgApp = angular.module('tgApp', [
            'ngRoute',
            'appControllers',
            'ngAnimate',
            'rzModule'
    ]);

tgApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            when('/', {
                templateUrl: 'views/list.html',
                controller: 'DataController'
            }).
            when('/search/:query', {
                templateUrl: 'views/list.html',
                controller: 'DataController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

tgApp.run(['$http','$rootScope', function ($http, $rootScope) {
        $http.get('data/languages.json',{cache:true}).success(function(data) {
            $rootScope.languages = data;
        });
    }]);

