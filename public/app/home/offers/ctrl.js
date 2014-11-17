/**
 * Created by mazia_000 on 2014-08-19.
 */
angular.module('abon')
    .controller('offersCtrl',function($scope, offerData, sharedOffersData, offersService){

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

    });