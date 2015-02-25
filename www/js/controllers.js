angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('FizzbuzzerCtrl', function($scope, $stateParams, $http, $q, $ionicLoading) {
    $scope.data = { slider: 15, fizzbuzzs: [] };

    $scope.fizzbuzzer = function(value) {
      var promise =
        $http.get('http://localhost:3000/fizzbuzz/' + value)
        .error(function(data, status) {
          console.log('http status:'  + status);
          alert("Ain't nobody got time for that!");
       });
       return promise;
    };


    var promises = [];
    $scope.runFizzbuzzer = function() {
      $ionicLoading.show();
      $scope.data.fizzbuzzs.length = 0;
      promises.length = 0;
      for (var i=0; i <= $scope.data.slider; i++) {
        promises.push($scope.fizzbuzzer(i));
      }
      if (promises.length > 0) {
        $q.all(promises).then(function(response) {
          for (var i=0; i < promises.length; i++) {
            $scope.data.fizzbuzzs.push(response[i].data);
          }
          $ionicLoading.hide();
        });
      }
    };
});
