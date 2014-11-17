
angular
    .module("abon", ["ui.bootstrap", 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/index/view.html',
            controller: 'indexCtrl'
        });

        $routeProvider.when('/offers',{
            templateUrl:'/app/home/offers/view.html',
            controller: 'offersCtrl',
            resolve:{
                'offerData':function(offersService){
                    return offersService.getOffers({})
                }
            }
        });

});
