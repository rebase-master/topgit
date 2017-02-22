var appControllers = angular.module('appControllers', ['ngAnimate']);

appControllers.controller('DataController', ['$scope', '$rootScope', '$http', '$timeout', '$routeParams', 'Repos', function($scope, $rootScope, $http, $timeout, $routeParams, Repos) {

    "use strict";

    $rootScope.foundResults = false;
    NProgress.start();

    var url = "https://api.github.com/search/repositories?q=stars:>1&s=stars&type=Repositories&callback=JSON_CALLBACK";;

    if($routeParams.query){
        url = "https://api.github.com/search/repositories?q=" + encodeURIComponent($routeParams.query) + "&sort=language&type=Repositories&callback=JSON_CALLBACK";
    }

    fetchRepo(url);

    function fetchRepo(url){
        console.log("Calling fetchRepos()...");
        Repos.fetchRepos(url)
            .then(function (response) {

                setRepository();

                NProgress.done();

            }, function (data) {
                console.log("error");
            });
    }

    function setRepository(){

        var result = Repos.getRepo();

        $rootScope.rateLimitRemaining   =   result.meta.rateLimitRemaining;
        $rootScope.rateLimit            =   result.meta.rateLimit;
        $rootScope.recordsCount         =   result.data.totalCount;
        $rootScope.slider               =   result.slider;
        $rootScope.foundResults         =   true;
        $scope.hasMore                  =   result.hasMore;
        $scope.prev                     =   result.link.prev;
        $scope.next                     =   result.link.next;
        $scope.items                    =   result.data.items;
        $scope.loadingResults           =   false;

        if($scope.items.length == 0)
            $scope.noResult = true;

    }

    $scope.filterFn = function(item)
    {
        return item['stargazers_count'] >= $rootScope.slider.value
    };

    $scope.refreshSlider = function () {
        $timeout(function () {
            $scope.$broadcast('rzSliderForceRender');
        });
    };

    $scope.loadNext = function () {
        $scope.items = null;
        $scope.loadingResults = true;
        fetchRepo($scope.next);
    };

    $scope.loadPrev = function () {
        $scope.items = null;
        $scope.loadingResults = true;
        fetchRepo($scope.prev);
    };



}]);

appControllers.controller('SearchController', ['$scope', '$location', function($scope, $location) {
    $scope.selectLang = function (val) {
        $scope.selLang = val;
        $scope.search = false;
    };

    $scope.searching = function () {
        $scope.search = true;
    };

    $scope.searchRepos = function () {
        var query = $scope.selLang.split(' ').join('+');
        $location.path('/search/'+encodeURI(query)).replace();
    };

}]);

