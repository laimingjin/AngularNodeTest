/**
 * Created by minlai on 2016/10/17.
 */

var indexApp = angular.module('indexApp', ['ngRoute','highcharts-ng']);
indexApp.config([
    '$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{

        })
        .otherwise({
            redirectTo: '/'
        });
    }
]);

indexApp.controller('DefaultController',['$scope','$http','GetChartsProvider',
    function($scope,$http,GetChartsProvider) {
        window.scope = $scope
        var table_data='';


        $scope.listingModels = ['xxx', 'yyy'];
        $scope.listingDevices = ['All', 'X'];
        var today = new Date();
        $scope.today = today.Format('yyyy-MM-dd');

        $http({
            method : 'GET',
            url : '/allSellingItem'
        }).then(function successCallback(response){
                if(response.status==200){
                    $scope.col = 'completionRate';
                    $scope.desc = 0;
                    $scope.tableItems=response.data;
                     table_data=response.data;
                }
            },function errorCallback(response){
                alert("allSellingItemError");
            }
        );

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'line'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            series:[],
            title: {
                text: 'charts'
            },
            loading: false,
            xAxis: {
                categories: ['Total','SYI+BOLD','-SYI','-BOLD'],
                title: {text: 'values'}
            },
            useHighStocks: false,
            size: {
                width: 600,
                height: 400
            },
            func: function (chart) {
                //setup some logic for the chart
            }
        };

        var promise = GetChartsProvider.query(); // 同步调用，获得承诺接口
        promise.then(function(pushed_data) {  // 调用承诺API获取数据 .resolve
            $scope.chartConfig.series=pushed_data;
        }, function(pushed_data) {  // 处理错误 .reject
            $scope.content = {error: '无数据！'};
        });

        $scope.go=function(target){
            var promise = GetChartsProvider.query(); // 同步调用，获得承诺接口
            promise.then(function(pushed_data) {  // 调用承诺API获取数据 .resolve
                $scope.chartConfig.series = [pushed_data[target]];
            }, function(pushed_data) {  // 处理错误 .reject
                $scope.content = {error: '无数据！'};
            });
        }
}]);

