/**
 * Created by mj on 16/10/8.
 */

indexApp.factory('GetChartsProvider', ['$http', '$q', function ($http, $q) {
    return {
        query : function() {
            var deferred = $q.defer();
            $http.get('/allSellingItem')
                .then(function(result) {
                var one_arr = [];
                var two_arr = [];
                var three_arr = [];
                var four_arr = [];
                var five_arr=[];
                var item_arr=[];
                var pushed_data = [];
                _.forEach(result.data,function(r){
                    item_arr.push(r.item);
                    one_arr.push( r.completionRate);
                    two_arr.push( r.photoCountPerDraft);
                    three_arr.push( r.avgListingTime);
                    four_arr.push(r.titleLengthPerDraft);
                    five_arr.push(r.errorCountPerDraft);
                })
                pushed_data.push({"name" : "completionRate","data" : one_arr});
                pushed_data.push({"name" : "photoCountPerDraft","data" : two_arr});
                pushed_data.push({"name" : "avgListingTime","data" : three_arr});
                pushed_data.push({"name" : "titleLengthPerDraft","data" : four_arr});
                pushed_data.push({"name" : "errorCountPerDraft","data" : five_arr});
                deferred.resolve(pushed_data);

            })
            .catch(function(err)
                {
                    deferred.reject(result); }
                );
            return deferred.promise;
        },// end query

        queryWithArg: function(arg){

        }


    };
}]);


