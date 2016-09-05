var appControllers = angular.module('appControllers', ['ngAnimate']);
var counter = 0;

appControllers.controller('DataController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    $rootScope.foundResults = false;
    $rootScope.hasMore = false;
    $rootScope.slider = {};
    //$rootScope.items = null;

    console.log("Called: "+(++window.counter));
    var paginateLink = null;

    NProgress.start();

    $http.get('data/languages.json',{cache:true}).success(function(data) {
        $scope.languages = data;
    });

    //For debugging/testing use local data
    //$http.get('data/sample.json',{cache:true}).success(function(response) {
    //    setData(response);
    //});

    var url = "https://api.github.com/search/repositories?q=stars:>1&s=stars&type=Repositories&callback=JSON_CALLBACK";
    $http.jsonp(url,{cache: true})
        .success(function(response){
            setData(response);
        });

    function setData(response){
        if(response.hasOwnProperty('data')) {

            if ($rootScope.items == null) {
                console.log("null");
                $rootScope.items = response.data.items;
            } else {
                console.log("not null");
                $rootScope.items.push.apply($rootScope.items, response.data.items);
            }

            $scope.min = min = Math.min.apply(Math, $rootScope.items.map(function (item) {
                return item.stargazers_count;
            }));
            $scope.max = max = Math.max.apply(Math, $rootScope.items.map(function (item) {
                return item.stargazers_count;
            }));
            $rootScope.slider = {
                value: min,
                options: {
                    floor: min,
                    ceil: max
                }
            };

            if (response.hasOwnProperty('meta')) {
                $rootScope.rateLimit = response.meta['X-RateLimit-Limit'];
                $rootScope.rateLimitRemaining = response.meta['X-RateLimit-Remaining'];
                var nextPage = response.meta['Link'][0];
                nextPage = nextPage[0].split(",");
                if(nextPage[0] !== undefined){
                    paginateLink = nextPage[0];
                    paginateLink = paginateLink.replace(/angular.callbacks._[0-9]/, 'JSON_CALLBACK');
                    $rootScope.hasMore = true;
                }
            }

            $rootScope.recordsCount = response.data.total_count;
            $rootScope.foundResults = true;
            //console.log($rootScope.items);
        }

        NProgress.done();

    };

    $scope.filterFn = function(item)
    {
        return item['stargazers_count'] >= $rootScope.slider.value
    };

    $scope.refreshSlider = function () {
        $timeout(function () {
            $scope.$broadcast('rzSliderForceRender');
        });
    };

    $rootScope.loadMore = function () {
        fetchRepos(paginateLink);
    };

    function fetchRepos(url){
        NProgress.start();
        $http.jsonp(url, {cache: true})
            .success(function(response){
                setData(response);
            });
    }
}]);

appControllers.controller('SearchController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    //$scope.foundResults = false;
    $rootScope.slider = {};
    $rootScope.items = null;
    NProgress.start();

    var paginateLink = false;

    $http.get('data/languages.json',{cache:true}).success(function(data) {
        $scope.languages = data;
    });

    function setData(response) {

        if($rootScope.items == null){
            $rootScope.items = response.data.items;
        }else{
            $rootScope.items.push.apply($rootScope.items, response.data.items);
        }

        $scope.min = min = Math.min.apply(Math,$rootScope.items.map(function(item){return item.stargazers_count;}));
        $scope.max = max = Math.max.apply(Math,$rootScope.items.map(function(item){return item.stargazers_count;}));
        $rootScope.slider = {
            value: min,
            options: {
                floor: min,
                ceil: max
            }
        };

        if(response.hasOwnProperty('meta')){
            $rootScope.rateLimit = response.meta['X-RateLimit-Limit'];
            $rootScope.rateLimitRemaining = response.meta['X-RateLimit-Remaining'];
            var nextPage = response.meta['Link'][0];
            nextPage = nextPage[0].split(",");
            paginateLink = nextPage[0];
            paginateLink = paginateLink.replace(/angular.callbacks._[0-9]/, 'JSON_CALLBACK');
        }

        $rootScope.recordsCount = response.data.total_count;
        //$rootScope.foundResults = true;

        NProgress.done();
    };

    $scope.searchRepos = function(){
        var url = "https://api.github.com/search/repositories?q="+$scope.selLang+"&sort=language&type=Repositories&callback=JSON_CALLBACK";
        $rootScope.items = null;
        fetchRepos(url);
        $rootScope.searchTerm = $scope.selLang;
    };

    $scope.selectLang = function(val){
        $scope.selLang = val;
        $scope.search = false;
    };

    $scope.filterFn = function(item)
    {
        return item['stargazers_count'] >= $rootScope.slider.value
    };


    $scope.refreshSlider = function () {
        $timeout(function () {
            $scope.$broadcast('rzSliderForceRender');
        });
    };

    $scope.searching = function () {
        $scope.search = true;
    };

    $scope.loadMore = function () {
        fetchRepos(paginateLink);
    };

    function fetchRepos(url){
        NProgress.start();
        $http.jsonp(url, {cache: true})
            .success(function(response){
                setData(response, true);
            });
    }
}]);

