var appControllers = angular.module('appControllers', ['ngAnimate']);

appControllers.controller('DataController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

    $rootScope.foundResults = false;
    $rootScope.slider = {};
    NProgress.start();
    var paginateLink = false;

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
            $rootScope.rateLimit = response.meta['X-RateLimit-Limit'];
            $rootScope.rateLimitRemaining = response.meta['X-RateLimit-Remaining'];
            var nextPage = response.meta['Link'][0];
            nextPage = nextPage[0].split(",");
            paginateLink = nextPage[0];
            paginateLink = paginateLink.replace('angular.callbacks._0', 'JSON_CALLBACK')
            setData(response.data);
        });

    setData = function (response) {
        $scope.items = response.items;
        $scope.min = min = Math.min.apply(Math,$scope.items.map(function(item){return item.stargazers_count;}));
        $scope.max = max = Math.max.apply(Math,$scope.items.map(function(item){return item.stargazers_count;}));
        $rootScope.slider = {
            value: min,
            options: {
                floor: min,
                ceil: max
            }
        };
        $rootScope.recordsCount = response.total_count;
        NProgress.done();

    };

    $scope.searchRepos = function(){
        var url = "https://api.github.com/search/repositories?q="+$scope.selLang+"&sort=language&type=Repositories&callback=JSON_CALLBACK";
        fetchRepos(url);
        $rootScope.foundResults = true;
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

    fetchRepos = function (url){
        NProgress.start();
        $http.jsonp(url, {cache: true})
            .success(function(response){
                setData(response.data);
            });
    }
}]);

