/**
 * Created by Shepard on 11/16/15.
 */
(function (angular) {

'use strict';
angular.module('dropdownMultiselect-ng', [])
    .directive('dropdownMultiselect',['$document', function($document){
    return {
        restrict: 'E',
        require: '?ngModel',
        scope:{
            model: '=',
            options: '=',
            setting: '=',
            events:'=',
            type:'='
        },
        replace: true,
        template: "<div  class='btn-group' ng-class='{open: open}'>"+
        "<button class='btn btn-sm btn-default dropdown-toggle' style='width:135px;text-align: left;overflow-x:hidden;position:relative'  ng-click='open=!open;openDropdown()'><span style='display:block;text-overflow: ellipsis;white-space: nowrap;width:100px;overflow-x: hidden;'>{{filterModel()}}</span><span class='caret' style='position:absolute;right:7px;top:12px'></span></button>"+
        "<ul  class='dropdown-menu' style='height: auto; max-height: 500px;overflow-x: hidden;' aria-labelledby='dropdownMenu'>" + "<li ng-repeat='option in options'> <a ng-click='setSelectedItem()' style='position: relative'>{{option.id}}<span style='position: absolute;top:6px;right:10px;' ng-class='isChecked(option.name)'></span></a></li>" +
        "</ul>" +
        "</div>" ,
        link: function ($scope, $element, $attrs) {

            //here we are going to update the model and controller
            $element.bind('click',function(event){
                event.stopPropagation();
            });

            $document.bind('click', function() {
                if($scope.open){
                  $scope.open=false;
                  $scope.$apply();
                }
            });



            $scope.filterModel = function(){
               if (!_.isUndefined($scope.model)){
                 var values = angular.copy($scope.model);
                 _(values).forEach(function(value,key){
                  
                   //Experience Type
                   if (value === 'Mobile: App'){
                     values[key] = 'Mobile: Native App';
                   }

                   if (value === 'Mobile: Web'){
                     values[key] = 'Mobile: mWeb';
                   }
                   //Seller Country
                   if (value === 'OTHER'){
                     values[key] = 'Other';
                   }

                 });
                 return values.join();
               }
            };

            $scope.externalEvents = {
                onItemSelect: angular.noop
            };

            angular.extend($scope.externalEvents, $scope.events || []);
            $scope.openDropdown = function(){
                //lets close all dropdown lists first
                $document.find('.open').removeClass('open');

                $scope.selected_items = [];

                //check the dropdown
                for(var i=0; i<$scope.options.length; i++){
                    $scope.selected_items.push($scope.options[i].id);
                }
            };

            $scope.setSelectedItem = function(){
                var id = this.option.name;
                //hardcode
                if ($scope.setting.singleSelected===true){
                    $scope.model=[];
                    $scope.model.push(id);
                }
                else {
                    if(id=='All'){
                        $scope.model = [];
                        $scope.model.push('All');

                    }else{
                        if (_.includes($scope.model, id)) {
                            $scope.model =  angular.copy (_.without($scope.model, id));
                        } else {
                            $scope.model.push(id);
                        }

                        if($scope.model.length>0){
                            $scope.model =  angular.copy (_.without($scope.model,'All'));
                        }
                        else {
                            $scope.model.push('All');
                        }
                    }

                }

                //here we are going to update the model and controller
                $scope.$watch($attrs.ngModel, function(id) {
                    $scope.externalEvents.onItemSelect($scope.model,$scope.type);
                });

                return false;

            };
            $scope.isChecked = function (id) {
                if (_.includes($scope.model, id)) {
                    return 'glyphicon glyphicon-ok';
                }
                return false;
            };
        }
    };
}]);
})(angular);
