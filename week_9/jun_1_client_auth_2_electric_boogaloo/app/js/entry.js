const angular = require('angular');
const demoApp = angular.module('demoApp', [require('angular-route')]);

require('./services')(demoApp);
require('./bears')(demoApp);
require('./auth')(demoApp);

demoApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/bears', {
      templateUrl: 'templates/bears/views/bears_view.html',
      controller: 'BearsController',
      controllerAs: 'bearsctrl'
    })
    // AUTH_EXP: how do the signin/up routes differ and what is their relationship
    // with one another
    //
    //ANSWER
    // The signup route is for a user that does not have an account to make one.They make a username and set a password and than they confirm the password. Doing this gives the user the ability to save bears and view the bears that they save and not anyone elses, because the wranglerID for bears is related to the user ID. Once a user signs up, it brings them to /bears. It is here where any previously stored bears by that user are displayed. The user is brought to here by a function call to the sign_up controller by the name of authctrl.authenticate, which is triggered when the user submits the signup form.
    // The sign in route uses the same template as the signup route, with certain elements being excluded depending on whether the user is at signup or signin. When a user signs in, it searches for a user in the database with the same username and password, and if it matches, than it will bring the user to /bears, and show the bears, or allow the user to create bears.
    // Both of these routes relate to eachother because they both are in essence doing the same thing. They save the current user as the one created or signed in, save the username, save the token to local storage, and allow the user to navigate the database. Once the user logs out, the token will be removed from local storage, and the username will be set to an empty string.
    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);
