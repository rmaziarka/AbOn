angular.module('abon')
    .controller('filtersCtrl', function ($scope) {


        $scope.filter = function () {
            var data = {
                priceFrom:$scope.priceFrom,
                priceTo:$scope.priceTo
            };
            $scope.$emit('offers-filterClicked',data);
        };



    });
