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
.controller('indexController',function(){
    var cityList = [{
        cityName:'北京',
        cityProvince:'北京',
        id:'CH010100'
    }];
    localStorage.cityList = JSON.stringify(cityList);
})