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
    when('/search?query=:queryParam', {
        templateUrl: 'views/list.html',
        controller: 'SearchController'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);