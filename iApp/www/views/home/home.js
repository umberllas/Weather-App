angular.module('starter')
.controller('homeController',['$scope','$ionicSlideBoxDelegate','$ionicTabsDelegate','$ionicModal','$timeout',function($scope,$ionicSlideBoxDelegate,$ionicTabsDelegate,$ionicModal,$timeout){
    var currentCity = JSON.parse(localStorage.currentCity);

    $scope.$on('$ionicView.beforeEnter',function(){
        console.log('页面进入');
        $ionicSlideBoxDelegate.slide(0);
        currentCity = JSON.parse(localStorage.currentCity);
        console.log(currentCity.cityName)
        $scope.currentCity = currentCity.cityName;
        console.log($scope.currentCity);
        $.getJSON('http://api.yytianqi.com/observe?city=' + currentCity.id + '&key=u3uwjc25e4wlio7d')
        .done(function(data){
            $scope.current = data.data;
                var time = $scope.current.lastUpdate.substr(11,2);
                time = Number(time);
                if(time > 5 && time < 19){
                    $scope.current.src = 'img/00_0.png';
                    $scope.current.srcBig = 'img/00_1.gif';
                }else{
                    $scope.current.src = 'img/00_1.png';
                    $scope.current.srcBig = 'img/00_0.gif';
                }
                $scope.$apply();
        })
        .fail(function(err){
            console.log(err);
        });
    });

    $ionicModal.fromTemplateUrl('modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function(){
        $scope.cityList = JSON.parse(localStorage.cityList);
        // $scope.$apply();
        $scope.modal.show();
    };


    $('body').delegate('.cityName','click',function(){
        $scope.modal.hide();
        var cityName = $(this).find('span').first().text();
        var cityProvince = $(this).find('span').last().text();
        var id = $(this).attr('data-id');
        localStorage.currentCity = JSON.stringify({
            cityName:cityName,
            cityProvince:cityProvince,
            id:id    
        });
    });


    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    $scope.clude = 'views/home/slide/detial.html';

    // tabs绑定slide
    $scope.selectedTab = function(){
        currentCity = JSON.parse(localStorage.currentCity);
        $scope.currentCity = currentCity.cityName; 
        var index = $ionicTabsDelegate.selectedIndex();
        $ionicSlideBoxDelegate.slide(index);
        
        if(index == 1){
            $.getJSON('http://api.yytianqi.com/weatherhours?city=' + currentCity.id + '&key=u3uwjc25e4wlio7d')
            .done(function(data){
                $scope.hourList = data.data.list;
                
                console.log($scope.hourList);
                getSrc($scope.hourList);
                $scope.$apply();
                
            })
            .fail(function(err){
                console.log(err);
            })
        }
        if(index == 2){
            $.getJSON('http://api.yytianqi.com/forecast7d?city=' + currentCity.id + '&key=u3uwjc25e4wlio7d')
            .done(function(data){
                console.log(data);
                $scope.predictList = data.data.list;
                $scope.$apply();
            })
            .fail(function(err){
                console.log(err)
            })
        }
        if(index == 0){
            currentCity = JSON.parse(localStorage.currentCity);
            console.log('index=0')
            $.getJSON('http://api.yytianqi.com/observe?city=' + currentCity.id + '&key=u3uwjc25e4wlio7d')
            .done(function(data){
                console.log(data)
                $scope.current = data.data;
                    var time = $scope.current.lastUpdate.substr(11,2);
                    time = Number(time);
                    if(time > 5 && time < 19){
                        $scope.current.src = 'img/00_0.png';
                        $scope.current.srcBig = 'img/00_1.gif';
                    }else{
                        $scope.current.src = 'img/00_1.png';
                        $scope.current.srcBig = 'img/00_0.gif';
                    }
                    $scope.$apply();
            })
            .fail(function(err){
                console.log(err)
            })
        }
    };

    // $scope.$on('$ionicView.beforeEnter',function(){
    //     console.log('kkkkk')
    // })

    // slide绑定tabs
    $scope.slideChanged = function(index){
        console.log(index);
        currentCity = JSON.parse(localStorage.currentCity);
        $ionicTabsDelegate._instances[0].select(index);
    };


    // 点击显示天气详情
    $scope.showClude = function(){
        if($scope.clude == 'views/home/slide/detial.html'){
            $scope.clude = 'views/home/slide/detialFalse.html';
        }
        else{
            $scope.clude = 'views/home/slide/detial.html';
        }
    }

    function getSrc(list){
        for(var i = 0; i<list.length; i++){
            var time = list[i].sj.substr(11,2);
            time = Number(time);
            if(time > 5 && time < 17){
                list[i].src = 'img/00_0.png';
            }else{
                list[i].src = 'img/00_1.png';
            }
        }
    }
}])
.filter('getHour',function(){
    return function(value){
        return value.substr(11,5);
    }
})