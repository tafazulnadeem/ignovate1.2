<script>
      angular.module('formExample', [])
      .controller('ExampleController', ['$scope', '$http', function($scope, $http) {
        $scope.master = {};
        $scope.update = function(user) {
          if ($scope.formx.$valid) {
            $scope.master = angular.copy(user);
            $http.post('http://localhost:3300/post', $scope.master
             ).success(function(data, status, headers, config) {
              alert("Success!")
             }).error(function(data, status, headers, config) {
               alert("Error");
            });
           }
         };
        $scope.reset = function() {
         $scope.user = angular.copy($scope.master);
        };
        $scope.reset();
      }]);
</script>