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

     console.log('Hey there');
     //$scope.foundResults = false;
     //$rootScope.slider = {};
     //$rootScope.items = null;
     //NProgress.start();
     //
     //var paginateLink = false;
     //
     //$scope.filterFn = function (item) {
     //    return item['stargazers_count'] >= $rootScope.slider.value
     //};
     //
     //
     //$scope.refreshSlider = function () {
     //    $timeout(function () {
     //        $scope.$broadcast('rzSliderForceRender');
     //    });
     //};
     //
     //$scope.loadMore = function () {
     //    $rootScope.loadingResults = true;
     //    fetchRepos(paginateLink);
     //};
     //$scope.selectLang = function (val) {
     //    $scope.selLang = val;
     //    $scope.search = false;
     //};
     //
     //$scope.searching = function () {
     //    $scope.search = true;
     //};
     //
     //$scope.searchRepos = function () {
     //    var url = "https://api.github.com/search/repositories?q=" + $scope.selLang.split(' ').join('+') + "&sort=language&type=Repositories&callback=JSON_CALLBACK";
     //    $rootScope.items = null;
     //    $rootScope.loadingResults = true;
     //    fetchRepos(url);
     //    $rootScope.searchTerm = $scope.selLang;
     //};
     //
     //function fetchRepos(url) {
     //    NProgress.start();
     //    $http.jsonp(url, {cache: true})
     //        .success(function (response) {
     //            setData(response, true);
     //        });
     //}

 }catch (error){
     $log.error(error);
 }

}]);

