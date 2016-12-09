/**
 * Created by minlai on 2016/10/9.
 */

var sellingApp = angular.module('sellingApp', ['ngRoute','highcharts-ng', 'angularjs-dropdown-multiselect']);

    sellingApp.config([
        '$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/db', {
            templateUrl:'files/db.ejs',
            controller: 'DBController'
        }).
        when('/json', {
            templateUrl:'files/table.ejs',
            controller: 'JsonController'
        }).
        when('/provider', {
            templateUrl: 'files/about.ejs',
            controller: 'ProviderController'
        }).
        when('/login', {
            templateUrl: 'files/login.ejs',
            controller: 'LoginController'
        }).
        when('/highcharts',{
            templateUrl: 'files/chart.ejs',
            controller: 'ChartController'
        }).
        otherwise({
            redirectTo: '/'
        });

    }]);



sellingApp.controller('JsonController',function ($scope,$http) {
    $scope.demotitle = "小例子";
    $scope.myOptions=[
       {
           "label":"a",
           "group":"f"
       },{
           "label":"b",
           "group":"f"
       },{
           "label":"c",
           "group":"m"
       }
   ];

    $scope.example1model = [];
    $scope.example1data = [
        {id: 1, label: "David"},
        {id: 2, label: "Jhon"},
        {id: 3, label: "Danny"}];
    $scope.example1settings = {
        smartButtonMaxItems: 3,
        smartButtonTextConverter: function (itemText, originalItem) {
            if (itemText === 'Jhon') {
                return 'Jhonny!';
            }
            return itemText;
        }
    };

    $http.get('files/selling.json').success(function(data) {
        $scope.items = data;
    });

    $scope.orderProp = 'completionRate';



    $scope.lodashContent=_.range(2000,2010);

});

sellingApp.controller('ProviderController', ['$scope', 'GetJsonFileProvider', function ($scope, GetJsonFileProvider) { // 引用我们定义的GetJsonFileProvider服务
    var promise = GetJsonFileProvider.query(); // 同步调用，获得承诺接口
    promise.then(function(data) {  // 调用承诺API获取数据 .resolve
        $scope.content = data;
    }, function(data) {  // 处理错误 .reject
        $scope.content = {error: '无数据！'};
    });
}]);
sellingApp.controller('LoginController', ['$scope', '$http',
    function($scope, $http) {
        $scope.submitForm = function(valid, event) {
            if (valid) {
                var form = event.target
                form.action = '/loginData';
                form.method = 'POST';
                form.submit();
            }
        };
    }
]);
sellingApp.controller('DBController',['$scope','$http',
function($scope,$http){
    $http({
        method : 'GET',
        url : '/allSellingItem'
    }).then(function successCallback(response){
    if(response.status==200){
        $scope.items=response.data;
    }
        },function errorCallback(response){
            alert("allSellingItemError");
        }
    );
}]);

sellingApp.controller('ChartController', ['$scope', 'GetChartsProvider', function ($scope, GetChartsProvider) {
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

}]);
