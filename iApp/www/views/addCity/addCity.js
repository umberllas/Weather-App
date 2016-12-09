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
            for(var i =0; i<citylist.length; i++){
                var diShi = citylist[i].list;
                for(var j = 0; j<diShi.length; j++){
                    if(diShi[j].name.indexOf(city) > -1){
                        var cityName = diShi[j].name;
                        var cityProvince = citylist[i].name;
                        var id = diShi[j].list[0].city_id;
                        $scope.$apply(function(){
                           
                            $scope.cityList = {
                                cityName:cityName,
                                cityProvince:cityProvince,
                                id:id
                            };
                            $scope.show = 'true';
                        })
                        
                        console.log($scope.cityList.cityName);
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
    })
}])