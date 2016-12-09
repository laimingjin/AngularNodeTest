var mailApp = angular.module('mailApp', ['ngRoute']);
mailApp.config([
    '$routeProvider',function($routeProvider){
        $routeProvider
            .when('/',{

            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

mailApp.controller('mailController',['$scope','$http',
    function($scope,$http) {
        window.scope = $scope;
        $scope.sendPerson='mj';
        $scope.sendDate=new Date().Format('w,M d,yyyy at hh:nn p');
        $scope.receivePerson='lai';
        $scope.subject='first subject';
        $scope.description='Track the adoption and performance metrics of all sellers.'

        $scope.tables=['1'];
        $scope.columns=['Snapshot Date','Snapshot Hour','Waitlist Seller Count','Opted In Seller Count','Opted In Rate','Cumulative Opted Out Seller Count','Opted Out Rate','Rolling 24HR Opted Out Seller Count','CUB Seller Count']





    }]);

