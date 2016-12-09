angular.module('starter')
.controller('homeController',['$scope','$ionicSlideBoxDelegate','$ionicTabsDelegate',function($scope,$ionicSlideBoxDelegate,$ionicTabsDelegate){
    // console.log($ionicSlideBoxDelegate)
    // console.log($ionicTabsDelegate)


    $scope.clude = 'views/home/slide/detial.html';

    // tabs绑定slide
    $scope.selectedTab = function(){
        var index = $ionicTabsDelegate.selectedIndex();
        console.log(index)
        $ionicSlideBoxDelegate.slide(index);
        
        if(index == 1){
            $.getJSON('http://api.yytianqi.com/weatherhours?city=CH010100&key=3n2bve9p3w84bfks')
            .done(function(data){
                $scope.hourList = data.data.list;
                
                getSrc($scope.hourList);
                
            })
            .fail(function(err){
                console.log(err)
            })
        }
        if(index == 2){
            $.getJSON('http://api.yytianqi.com/forecast7d?city=CH010100&key=3n2bve9p3w84bfks')
            .done(function(data){
                console.log(data);
                $scope.predictList = data.data.list;
            })
            .fail(function(err){
                console.log(err)
            })
        }
        if(index == 0){
            console.log('index=0')
            $.getJSON('http://api.yytianqi.com/observe?city=CH010100&key=3n2bve9p3w84bfks')
            .done(function(data){
                console.log(data)
                $scope.current = data.data;
                    var time = $scope.current.lastUpdate.substr(11,2);
                    time = Number(time);
                    if(time > 5 && time < 17){
                        $scope.current.src = 'img/00_0.png';
                        $scope.current.srcBig = 'img/00_1.gif';
                    }else{
                        $scope.current.src = 'img/00_1.png';
                        $scope.current.srcBig = 'img/00_0.gif';
                    }
            })
            .fail(function(err){
                console.log(err)
            })
        }
    };

    $scope.$on('$ionicView.beforeEnter',function(){
        console.log('kkkkk')
    })

    // slide绑定tabs
    $scope.slideChanged = function(index){
        console.log(index);
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