// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;

angular.module('bitesize', ['ionic', 'bitesize.controllers', 'bitesize.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    if(window.cordova) {
      // App syntax
      window.plugins.sqlDB.copy("bitesize.db", 0, copySuccess, copyError);

      function copySuccess() {
        //open db and run your queries
        db = $cordovaSQLite.openDB("bitesize.db");
      }

      function copyError(e) {
        //db already exists or problem in copying the db file. Check the Log.
        db = $cordovaSQLite.openDB("bitesize.db");
        console.log("Error Code = "+JSON.stringify(e));
        //e.code = 516 => if db exists

      }

    } else {
      
      db = window.openDatabase('bitesize.db', '1.0', 'Bitesize', -1);
      
      // Ionic serve syntax
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS `categories` (`id` int(11), `letter_prefix` char(1), `category_name` varchar(255), PRIMARY KEY (`id`));");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (1,'A','Bakery products');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (2,'B','Beverages, alcoholic');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (3,'C','Beverages, non-alcoholic');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (4,'D','Breakfast cereals');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (5,'E','Cereals & pseudo-cereals');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (6,'F','Dairy');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (7,'G','Eggs');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (8,'H','Fast foods');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (9,'J','Fats & oils');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (10,'K','Fin fishes');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (11,'L','Fruits');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (12,'M','Meats');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (13,'N','Meat products');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (14,'P','Miscellaneous');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (15,'Q','Nuts & seeds');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (16,'R','Recipes');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (17,'S','Sauces & condiments');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (18,'T','Shellfishes');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (19,'U','Snackfoods');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (20,'V','Soups');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (21,'W','Sugars, confectionaries & sweet spreads');");
      $cordovaSQLite.execute(db, "INSERT INTO `categories` VALUES (22,'X','Vegetables & pulses');");
      
    }

  });
  
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
