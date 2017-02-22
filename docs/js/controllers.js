var appControllers = angular.module('appControllers', ['ngAnimate']);

appControllers.controller('DataController', ['$scope', '$rootScope', '$http', 'Repos', function($scope, $rootScope, $http, Repos) {

    "use strict";

    $scope.items = [];
    $rootScope.foundResults = false;

    NProgress.start();

    //For debugging/testing use local data
    //$http.get('data/sample.json',{cache:true}).success(function(response) {
    //    setData(response);
    //});

    var url = "https://api.github.com/search/repositories?q=stars:>1&s=stars&type=Repositories&callback=JSON_CALLBACK";

    Repos.fetchRepos(url)
    .then(function (data) {
        Repos.setData(data);
        var repo = Repos.getData();
        $scope.items = repo.data.items;
        //$scope.$apply($scope.items);
        console.log($scope.items);
    }, function (data) {
        console.log("error");
    });


    $scope.watch('items', function () {
        
    });
    
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
        //fetchRepos(paginateLink);
    };

}]);

//appControllers.controller('AppController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
//    $scope.selectLang = function(val){
//        $scope.selLang = val;
//        $scope.search = false;
//    };
//
//    $scope.searching = function () {
//        $scope.search = true;
//    };
//
//    $scope.searchRepos = function(){
//        var url = "https://api.github.com/search/repositories?q="+$scope.selLang+"&sort=language&type=Repositories&callback=JSON_CALLBACK";
//        $rootScope.items = null;
//        fetchRepos(url);
//        $rootScope.searchTerm = $scope.selLang;
//    };
//
//    function fetchRepos(url){
//        NProgress.start();
//        $http.jsonp(url, {cache: true})
//            .success(function(response){
//                setData(response, true);
//            });
//    }
//
//
//}]);

appControllers.controller('SearchController', ['$scope', '$rootScope', '$http', '$log', function($scope, $rootScope, $http, $log) {


 try {

     //$scope.foundResults = false;
     $rootScope.slider = {};
     $rootScope.items = null;
     NProgress.start();

     var paginateLink = false;

     $scope.filterFn = function (item) {
         return item['stargazers_count'] >= $rootScope.slider.value
     };


     $scope.refreshSlider = function () {
         $timeout(function () {
             $scope.$broadcast('rzSliderForceRender');
         });
     };

     $scope.loadMore = function () {
         $rootScope.loadingResults = true;
         fetchRepos(paginateLink);
     };
     $scope.selectLang = function (val) {
         $scope.selLang = val;
         $scope.search = false;
     };

     $scope.searching = function () {
         $scope.search = true;
     };

     $scope.searchRepos = function () {
         var url = "https://api.github.com/search/repositories?q=" + $scope.selLang.split(' ').join('+') + "&sort=language&type=Repositories&callback=JSON_CALLBACK";
         $rootScope.items = null;
         $rootScope.loadingResults = true;
         fetchRepos(url);
         $rootScope.searchTerm = $scope.selLang;
     };

     function fetchRepos(url) {
         NProgress.start();
         $http.jsonp(url, {cache: true})
             .success(function (response) {
                 setData(response, true);
             });
     }

 }catch (error){
     $log.error(error);
 }

}]);

