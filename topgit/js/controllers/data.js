var appControllers = angular.module('appControllers', ['ngAnimate']);

appControllers.controller('DataController', ['$scope', '$rootScope', '$http', '$timeout', 'Repos', function($scope, $rootScope, $http, $timeout, Repos) {

    "use strict";

    //$scope.items = [];
    $rootScope.foundResults = false;

    NProgress.start();

    //For debugging/testing use local data
    //$http.get('data/sample.json',{cache:true}).success(function(response) {
    //    $scope.items = response.data.items;
    //    console.log($scope.items);
    //    NProgress.done();
    //});

    var url = "https://api.github.com/search/repositories?q=stars:>1&s=stars&type=Repositories&callback=JSON_CALLBACK";

    //Repos.setRepo(url);
    //var repo = Repos.setRepo(url)

    Repos.setRepo(url)
    .then(function (response) {
        $scope.items = response.data.items;
        console.log($scope.items);
    }, function (data) {
        console.log("error");
    });

    //.then(function (data) {
    //    //$timeout(function () {
    //    //    Repos.setRepo(data);
    //        var repo = Repos.getRepo();
    //        $scope.items = repo.data.items;
    //        console.log($scope.items);
    //    //})
    //    //$scope.$apply();
    //    //console.log(repo.data.items);
    //}, function (data) {
    //    console.log("error");
    //});


    //$scope.watch('items', function () {
    //    $scope.$apply();
    //});
    
    //$scope.filterFn = function(item)
    //{
    //    return item['stargazers_count'] >= $rootScope.slider.value
    //};
    //
    //$scope.refreshSlider = function () {
    //    $timeout(function () {
    //        $scope.$broadcast('rzSliderForceRender');
    //    });
    //};
    //
    //$rootScope.loadMore = function () {
    //    //fetchRepos(paginateLink);
    //};

}]);

