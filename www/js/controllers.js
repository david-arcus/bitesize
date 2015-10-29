angular.module('bitesize.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Products) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.categories = [];
  $scope.categories = null;

  $scope.getCategories = function() {
    Products.getAllCategories().then(function(result){
      $scope.categories = result;
    });
  }
  
  $scope.getCategories();
    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Products) {
  
  var categoryId = $stateParams.chatId;
  
  $scope.items = [];
  $scope.items = null;

  $scope.getItems = function() {
    Products.getItemsInCategory(categoryId).then(function(result){
      $scope.items = result;
    });
  }
  
  $scope.getItems();
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
