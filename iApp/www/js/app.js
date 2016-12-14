// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.config(['$stateProvider','$urlRouterProvider',function($sp,$urp){
    $sp.state('slide',{
        url:'/slide',
        views:{
            slide:{
                templateUrl:'views/slide/slide.html'
            }
        }
    }).state('home',{
        url:'/home',
        views:{
            slide:{
                templateUrl:'views/home/home.html',
                controller:'homeController'
            }
        }
    }).state('city',{
        url:'/city',
        views:{
            slide:{
                templateUrl:'views/city/city.html',
                controller:'cityController'
            }
        }
    }).state('addCity',{
        url:'/addCity',
        views:{
            slide:{
                templateUrl:'views/addCity/addCity.html',
                controller:'addCityController'
            }
        }
    })
    $urp.when('','/slide')
}])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('indexController',['$scope',function($scope){
    var citylist = {
        cityName:'北京',
        cityProvince:'北京',
        id:'CH010100'
    };
    localStorage.currentCity = JSON.stringify(citylist);
    localStorage.cityList = JSON.stringify([{
        cityName:'北京',
        cityProvince:'北京',
        id:'CH010100'
    }]);

    function myFun(result){
        $scope.locationCiyt = result.name;
        $scope.locationCiyt = $scope.locationCiyt.slice(0,$scope.locationCiyt.length-1);
         $.getJSON('http://api.yytianqi.com/citylist/id/1')
        .done(function(data){
            var citylist = data.list;
            
            for(var i =0; i<citylist.length; i++){
                var diShi = citylist[i].list;
                for(var j = 0; j<diShi.length; j++){   
                    if(diShi[j].name == $scope.locationCiyt + ''){
                        var cityName = diShi[j].name;
                        var cityProvince = citylist[i].name;
                        var id = diShi[j].list[0].city_id;
                        localStorage.locationCiyt = JSON.stringify({
                            cityName:cityName,
                            cityProvince:cityProvince,
                            id:id
                        });
                    }
                }
            }
        })
        .fail(function(err){
            console.log(err);
        });
    }
    var myCity = new BMap.LocalCity();
    myCity.get(myFun);
   

}])
.service('getCurrent',function(){
    return function(){
        
    };
});