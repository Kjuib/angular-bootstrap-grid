(function (angular) {
    'use strict';
    angular.module('angularBootstrapGrid', []).directive('angularBootstrapGrid', ['$compile', function ($compile) {
        return {
            restrict: 'AE',
            scope: {
                list: '=',
                size: '@',
                responsive: '@'
            },
            link: function ($scope, $element) {
                var cellTemplate = $element[0].innerHTML.trim();

                if (!$scope.size || ($scope.size !== 1 && $scope.size !== 2 && $scope.size !== 3 && $scope.size !== 4 && $scope.size !== 6)) {
                    $scope.size = 3;
                }

                if (!$scope.responsive || ($scope.responsive !== 'xs' && $scope.responsive !== 'sm' && $scope.responsive !== 'md' && $scope.responsive !== 'lg')) {
                    $scope.responsive = 'md';
                }

                $scope.$watchCollection('list', function () {
                    $element.empty();

                    if (!$scope.list || !angular.isArray($scope.list)) {
                        // Not a proper list object passed in
                        return;
                    }

                    var rowCount = $scope.list.length / $scope.size;
                    var cellPerRow = 12 / $scope.size;

                    for (var i = 0; i < rowCount; i++) {
                        var row = angular.element('<div class="row"></div>');
                        for (var j = 0; j < $scope.size; j++) {
                            var cell = angular.element('<div class="col-' + $scope.responsive + '-' + cellPerRow + '">' + cellTemplate + '</div>');
                            var index = (i * $scope.size) + j;
                            if (index >= $scope.list.length) {
                                break;
                            }

                            var childScope = $scope.$new();
                            childScope.$item = $scope.list[index];
                            childScope.$index = index;
                            $compile(cell[0])(childScope);
                            row.append(cell);
                        }
                        $element.append(row);
                    }
                });
            }
        };
    }]);
})(angular);
