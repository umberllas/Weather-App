angular.module('starter')
.controller('cityController',function($scope){
    $scope.$on('$ionicView.beforeEnter',function(){
        $scope.cityList = JSON.parse(localStorage.cityList);
        // console.log('city is ok')
        console.log($scope.cityList);
    })
    
})