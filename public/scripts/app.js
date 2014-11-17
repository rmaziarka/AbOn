
angular
    .module("abon", ["ui.bootstrap", 'ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/index/view.html',
            controller: 'indexCtrl'
        });

        $routeProvider.when('/offers',{
            templateUrl:'/app/home/offers/view.html',
            controller: 'offersCtrl',
            resolve:{
                'offerData':["offersService", function(offersService){
                    return offersService.getOffers({})
                }]
            }
        });

}]);

angular.module("abon")
    .controller("indexCtrl", ["$scope", function($scope) {
        $scope.heading = "Fajny nagłówek";
    }]);
angular.module('abon')
    .controller('breadcrumbsCtrl', ["$scope", "sharedOffersData", function ($scope,sharedOffersData) {

        $scope.selectedCategory = sharedOffersData.get().selectedCategory;
        $scope.offersNumber = sharedOffersData.get().offersNumber;

        $scope.categoryClicked = function(categoryId) {
            messageBus.emitMsg('offers-categoryClicked',categoryId);
        };

        $scope.$emit('offers-offersReceived', function (event, data) {
            $scope.selectedCategory = data.selectedCategory;
            createParentList()
        });


        var createParentList = function () {
            $scope.parentCategories = [];

            var category = $scope.selectedCategory;

            while (category.parent != null) {
                category = category.parent;
                $scope.parentCategories.unshift(category);
            }

        }

        createParentList();
    }]);

angular.module('abon')
    .controller('categoriesCtrl', ["$scope", "sharedOffersData", function ($scope, sharedOffersData) {

        $scope.selectedCategory = sharedOffersData.get().selectedCategory;
        $scope.offersNumber = sharedOffersData.get().offersNumber;

        $scope.categoryClicked = function(categoryId) {
            $scope.$emit('offers-categoryClicked',categoryId);
        };

        $scope.$on('offers-offersReceived', function (event, data) {
            $scope.selectedCategory = data.selectedCategory;
        });

    }]);

/**
 * Created by mazia_000 on 2014-08-19.
 */
angular.module('abon')
    .controller('offersCtrl',["$scope", "offerData", "sharedOffersData", "offersService", function($scope, offerData, sharedOffersData, offersService){

        $scope.offers = offerData.offers;
        $scope.offersNumber  = offerData.offers;
        sharedOffersData.set(offerData);

        var templatePath = '/app/home/offers/templates/';
        $scope.template = templatePath + 'three.html';

        $scope.changeView = function (view) {
            $scope.template = templatePath + view;
        }


        $scope.$on('offers-categoryClicked', function (event, categoryId) {
            $scope.categoryId = categoryId;

            getOffers();
        });

        $scope.$on('offers-pageClicked', function (event, page) {
            $scope.page = page;

            getOffers();
        });

        $scope.$on('offers-filterClicked', function (event, data) {
            $scope.priceFrom = data.priceFrom;
            $scope.priceTo = data.priceTo;

            getOffers();
        });


        function prepareSearchParams() {
            var params = {
                categoryId: $scope.categoryId,
                name: $scope.name,
                priceTo: $scope.priceTo,
                priceFrom: $scope.priceFrom,
                page: $scope.page
            };
            return params;
        }

        function getOffers() {
            var params = prepareSearchParams();
            offersService.getOffers(params).then(function(data) {
                $scope.offers = data.offers;

                $scope.$broadcast('offers-offersReceived', data);
            });
        }

    }]);
angular.module('abon')
    .controller('filtersCtrl', ["$scope", function ($scope) {


        $scope.filter = function () {
            var data = {
                priceFrom:$scope.priceFrom,
                priceTo:$scope.priceTo
            };
            $scope.$emit('offers-filterClicked',data);
        };



    }]);

/**
 * Created by mazia_000 on 2014-08-19.
 */
angular.module('abon')
    .service('offersService',["$http", function($http){
        return {
            getOffers: function (params) {
                return $http.get('/api/offers/getOffers', {
                    params: params
                }).then(function(obj){
                    return obj.data;
                });

            }
        };
    }]);


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


angular.module("abon")
    .controller("navCtrl", function() {
        var self = this;
        self.isCollapsed = true;

        self.toggleCollapsed = function(){
            self.isCollapsed = !self.isCollapsed;
        };
    });
/**
 * Created by mazia_000 on 2014-08-19.
 */
angular.module('abon')
    .factory('messageBus', ["$rootScope", function ($rootScope) {
        var msgBus = {};
        msgBus.emitMsg = function (msg, data) {
            data = data || {};
            $rootScope.$emit(msg, data);
        };
        msgBus.onMsg = function (msg, func, scope) {
            $rootScope.$on(msg, func);
        };
        return msgBus;
    }]);