var app = angular.module('insightApp', ['ngRoute','dropdownMultiselect-ng','ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.controller('LandingPageController',['$scope','$http','$uibModal','$log', '$document',
    function($scope,$http,$uibModal, $document,$log) {
        window.scope = $scope;
        $scope.filter_listingSite_dataSource=[
            {id: 'All',name:'All'},
            {id: 'US', name: 'US'},
            {id: 'UK', name: 'UK'},
            {id: 'IT', name: 'IT'},
            {id: 'CA', name: 'CA'},
            {id: 'AU', name: 'AU'},
            {id: 'DE', name: 'DE'},
            {id: 'FR', name: 'FR'},
            {id: 'ES', name: 'ES'}
        ];
        $scope.filter_setting_single={singleSelected:true};
        $scope.filter_listingSite_model=['All'];
        $scope.filter_sellerCountry_model=['All'];
        $scope.filter_sellerSegment_model=['All'];
        $scope.filter_listingFormat_model=['All'];
        $scope.filterEvent={
            onItemSelect:function(value){
                console.log($scope.filter_listingSite_model);
            }
        };
        $scope.filter_sellerCountry_dataSource=[
            {id: 'All',name:'All'},
            {id: 'US', name: 'US'},
            {id: 'UK', name: 'UK'},
            {id: 'IT', name: 'IT'},
            {id: 'CA', name: 'CA'},
            {id: 'AU', name: 'AU'},
            {id: 'DE', name: 'DE'},
            {id: 'FR', name: 'FR'},
            {id: 'ES', name: 'ES'}
        ];
        $scope.filter_sellerSegment_dataSource=[
            {id: 'All',name:'All'},
            {id: 'Entrepreneur',name:'Entrepreneur'},
            {id: 'Large Merchant',name:'Large Merchant'},
            {id: 'Merchant',name:'Merchant'},
            {id: 'Regular',name:'Regular'},
            {id: 'Occasional',name:'Occasional'},
            {id: 'New',name:'New'},
            {id: 'FTL',name:'FTL'}

        ];
        $scope.filter_listingFormat_dataSource=[
            {id: 'All',name:'All'}
        ];

        $scope.initial=function () {
            $scope.levels=['Overview'];
            $scope.dataList=[
                {
                    catagory:'Hard Goods',
                    details:[
                        {
                            name:'GMV(M)',
                            Overall_Actual:'$259.17', Overall_WoW:'-0.29%', Overall_YoY:'3.32%',
                            C2C_Actual:'$55.20', C2C_WoW:'-0.29%',C2C_YoY:'-8.58%',
                            B2B_Actual:'$130.58',B2B_WoW:'6.04%',B2B_YoY:'-1.1%',
                            alert:true
                        },
                        {
                            name:'SI(M)',
                            Overall_Actual:'$259.17', Overall_WoW:'-0.29%', Overall_YoY:'3.32%',
                            C2C_Actual:'$55.20', C2C_WoW:'-0.29%',C2C_YoY:'-8.58%',
                            B2B_Actual:'$130.58',B2B_WoW:'6.04%',B2B_YoY:'-1.2%',
                            alert:false
                        }
                    ]
                },
                {
                    catagory:'Soft Goods',
                    details:[
                        {
                            name:'GMV(M)',
                            Overall_Actual:'$259.17', Overall_WoW:'-0.29%', Overall_YoY:'3.32%',
                            C2C_Actual:'$55.20', C2C_WoW:'-0.29%',C2C_YoY:'-8.58%',
                            B2B_Actual:'$130.58',B2B_WoW:'6.04%',B2B_YoY:'-1.1%',
                            alert:false
                        },
                        {
                            name:'SI(M)',
                            Overall_Actual:'$259.17', Overall_WoW:'-0.29%', Overall_YoY:'3.32%',
                            C2C_Actual:'$55.20', C2C_WoW:'-0.29%',C2C_YoY:'-8.58%',
                            B2B_Actual:'$130.58',B2B_WoW:'6.04%',B2B_YoY:'-1.1%',
                            alert:false
                        }
                    ]
                }
            ];
        };
        $scope.willAlert=function () {
            return 'color:red';
            console.log('red');
            // if(alert=='true'){
            //     return 'color:red';
            //     console.log('red');
            // }else{
            //     return 'color:#FFFFFF';
            //     console.log('black');
            // }
        };

        $scope.applyFilter=function () {
            console.log($scope.filter_listingSite_model);
            console.log($scope.filter_sellerCountry_model);
            console.log($scope.filter_sellerSegment_model);
            console.log($scope.filter_listingFormat_model);
        };
        $scope.nextLevel=function (levels,catagory) {
            $scope.levels=levels;
            $scope.levels.push(catagory);
            $scope.dataList=[
                {
                    catagory:'Electronlcs and Gift Cards',
                    details:[
                        {
                            name:'SI(M)',
                            Overall_Actual:'$259.17',
                            Overall_WoW:'-0.29%',
                            Overall_YoY:'3.32%',
                            C2C_Actual:'$55.20',
                            C2C_WoW:'-0.29%',
                            C2C_YoY:'8.58%',
                            B2B_Actual:'$130.58',
                            B2B_WoW:'6.04%',
                            B2B_YoY:'-1.1%',
                        },
                        {
                            name:'ASP(M)',
                            Overall_Actual:'$259.17',
                            Overall_WoW:'-0.29%',
                            Overall_YoY:'3.32%',
                            C2C_Actual:'$55.20',
                            C2C_WoW:'-0.29%',
                            C2C_YoY:'8.58%',
                            B2B_Actual:'$130.58',
                            B2B_WoW:'6.04%',
                            B2B_YoY:'-1.1%',
                        }
                    ]
                }
            ];
        };

        $scope.graph_title='test graph';
        $scope.config={
            title: {
                text: 'GMV'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: ''
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        };

        $scope.items = ['html5','jq','FE-演示平台'];
        $scope.openGraph = function (size) {
            var modalInstance = $uibModal.open({
                templateUrl : 'myModelContent.html',  //指向上面创建的视图
                controller : 'LandingPageController',// 初始化模态范围
                size : size, //大小配置
                resolve : {
                    items : function(){
                        return $scope.items;
                    }
                }
            })
            modalInstance.result.then(function(selectedItem){
                $scope.selected = selectedItem;
            },function(){
                $log.info('Modal dismissed at: ' + new Date())
            });




        };









    }]);

angular.module('insightApp').controller('ModalInstanceCtrl',['$scope','$modalInstance','items',function($scope,$modalInstance,items){ //依赖于modalInstance
    $scope.items = items;
    $scope.selected = {
        item : $scope.items[0]
    };
    $scope.ok = function(){
        $modalInstance.close($scope.selected.item); //关闭并返回当前选项
    };
    $scope.cancel = function(){
        $modalInstance.dismiss('cancel'); // 退出
    }

}]);