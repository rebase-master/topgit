var appControllers = angular.module('appControllers', ['ngAnimate']);

appControllers.controller('DataController', ['$scope', '$rootScope', '$http', '$timeout', 'Repos', function($scope, $rootScope, $http, $timeout, Repos) {

    "use strict";

    $rootScope.foundResults = false;
    NProgress.start();

    //For debugging/testing use local data
    //var url = "data/sample.json";
    //fetchAndSetRepo(url);

    var url = "https://api.github.com/search/repositories?q=stars:>1&s=stars&type=Repositories&callback=JSON_CALLBACK";
    fetchAndSetRepo(url);

    function fetchAndSetRepo(url){
        Repos.fetchRepos(url)
            .then(function (response) {

                var result = Repos.getRepo();
                $rootScope.rateLimitRemaining   = result.meta.rateLimitRemaining;
                $rootScope.rateLimit            = result.meta.rateLimit;
                $rootScope.recordsCount     = result.data.totalCount;
                $rootScope.slider           = result.slider;
                $rootScope.foundResults     = true;
                $scope.hasMore              = result.hasMore;
                $scope.prev                 = result.link.prev;
                $scope.next                 = result.link.next;
                $scope.items                = result.data.items;
                $scope.loadingResults       = false;

                console.log(result);

            }, function (data) {
                console.log("error");
            });
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
        fetchAndSetRepo($scope.next);
    };

    $scope.loadPrev = function () {
        $scope.items = null;
        $scope.loadingResults = true;
        fetchAndSetRepo($scope.prev);
    };

}]);

