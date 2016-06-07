var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location',  'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_in_controller
    //
    // ANSWER
    // This differs from the signin controller in that it makes a post request, and saves the new user. It also differs in that it doesn't encode the username and password into base64, because it is not checking if a user exists, it is merely saving the user and bringing tem to bears, which will not have any bears yet because this is the first that this user has been used. The post request is also made to a different route. signup, as opposed to sign in. It also sets the buttontext differently and sets this.signup to true so that the templates perform correctly.
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create New User!'
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'Could not create user'));
    };
  }]);
};
