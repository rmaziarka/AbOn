angular.module('abon')
    .controller('breadcrumbsCtrl', function ($scope,sharedOffersData) {

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
    });
