angular.module('abon')
    .controller('categoriesCtrl', function ($scope, sharedOffersData) {

        $scope.selectedCategory = sharedOffersData.get().selectedCategory;
        $scope.offersNumber = sharedOffersData.get().offersNumber;

        $scope.categoryClicked = function(categoryId) {
            $scope.$emit('offers-categoryClicked',categoryId);
        };

        $scope.$on('offers-offersReceived', function (event, data) {
            $scope.selectedCategory = data.selectedCategory;
        });

    });
