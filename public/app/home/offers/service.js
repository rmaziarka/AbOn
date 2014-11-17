/**
 * Created by mazia_000 on 2014-08-19.
 */
angular.module('abon')
    .service('offersService',function($http){
        return {
            getOffers: function (params) {
                return $http.get('/api/offers/getOffers', {
                    params: params
                }).then(function(obj){
                    return obj.data;
                });

            }
        };
    });

