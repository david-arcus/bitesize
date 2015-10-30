angular.module('bitesize.services', [])

.factory('DBA', function($cordovaSQLite, $q, $ionicPlatform) {
  
  var self = this;

  // Handle queries and potential errors
  self.query = function (query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('Error:');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  }

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }

  return self;
  
})

.factory('Products', function($cordovaSQLite, DBA) {
  var self = this;

  self.getAllCategories = function() {
    return DBA.query("SELECT id, letter_prefix, category_name FROM categories")
      .then(function(result){
        return DBA.getAll(result);
      });
  }

  self.getItemsInCategory = function(categoryId) {
    var parameters = [categoryId];
    return DBA.query("SELECT categories.category_name, food_items.short_food_name FROM food_items INNER JOIN categories ON categories.id = food_items.category_id WHERE category_id = (?) AND parent = 1", parameters)
      .then(function(result) {
        return DBA.getAll(result);
      });
  }
  
  self.getCategoryName = function(categoryId) {
    var parameters = [categoryId];
    return DBA.query("SELECT id, category_name FROM categories WHERE id = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
    });
  }

  return self;
})
