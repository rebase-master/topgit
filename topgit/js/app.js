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
    otherwise({
        redirectTo: '/'
    });
}]);