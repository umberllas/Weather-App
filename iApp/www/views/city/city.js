angular.module('starter')
.controller('cityController',function($scope){
    $scope.$on('$ionicView.beforeEnter',function(){
        $scope.cityList = JSON.parse(localStorage.cityList);
        // console.log('city is ok')
        console.log($scope.cityList);
    })
    $('body').delegate('.item-content','click',function(){
        var cityName = $(this).find('span').first().text();
        var cityProvince = $(this).find('span').last().text();
        var id = $(this).parent().attr('data-id');
        localStorage.currentCity = JSON.stringify({
            cityName:cityName,
            cityProvince:cityProvince,
            id:id    
        });
    })
    
})