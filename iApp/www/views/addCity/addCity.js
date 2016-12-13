angular.module('starter')
.controller('addCityController',['$scope',function($scope){
    $scope.show = '';
    
    $('body').delegate('#search','keyup',function(){
        var city = $scope.city;
        $scope.cityList = {};
        console.log(city)
        $.getJSON('http://api.yytianqi.com/citylist/id/1')
        .done(function(data){
            var citylist = data.list;
            var cityExists = 'true';
            for(var i =0; i<citylist.length; i++){
                var diShi = citylist[i].list;
                
                for(var j = 0; j<diShi.length; j++){
                    if(diShi[j].name == city){
                        // console.log('true')
                        cityExists = 'false';
                        var cityName = diShi[j].name;
                        var cityProvince = citylist[i].name;
                        var id = diShi[j].list[0].city_id;
                        $scope.$apply(function(){
                            $scope.cityList = {
                                cityName:cityName,
                                cityProvince:cityProvince,
                                id:id
                            };
                            var exists = 'true';
                            
                            var cityList = JSON.parse(localStorage.cityList);
                            for(var k = 0; k< cityList.length; k++){
                                if(cityList[k].cityName == cityName){
                                    exists = '';
                                    alert('此城市已在列表当中');
                                }
                            }
                            if(exists){
                                cityList = cityList.concat($scope.cityList);
                                localStorage.cityList = JSON.stringify(cityList);
                                var str = localStorage.cityList;
                                console.log(JSON.parse(str));
                                $scope.show = 'true';
                            }
                        })
                        console.log($scope.cityList.cityName);
                    }
                    if(cityExists == 'true'){
                        $scope.$apply(function(){
                            $scope.show = '';
                        })
                    }
                }
            }
            
        })
        .fail(function(err){
            console.log(err)
        })
    })

    $('body').delegate('.city','click',function(){
        $scope.$apply(function(){
            $scope.city = '';
            $scope.show = '';
        })
        console.log($scope.cityList)
        localStorage.currentCity = JSON.stringify($scope.cityList);
    })
}])