/**
 * Created by mazia_000 on 2014-08-20.
 */
angular.module('abon')
    .service('sharedOffersData',function(){
        var property;
    return {
        get:function(){
            return property;
        },
        set:function(prop){
            property = prop;
        }
    }

   });

