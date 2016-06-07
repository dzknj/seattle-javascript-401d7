module.exports = function(app) {
  app.controller('AuthController', ['cfAuth', 'cfHandleError',  '$location', function(auth, handleError, $location) {
    this.username = '';
    this.errors = [];
    this.getUsername = function() {
      // AUTH_EXP: What happens when this function is called?
      //
      //ANSWER
      // When this function is called, it is calling the function from the auth_service by the name of getUsername. It sets the this.username to the current user, which is done with the auth service. It will check for the username and token and make the get request to /profile which will verify the user and in turn display the bears related to that user. So the flow is basically, page view to /profile, which is in authrouter, which is connected to the jwt_auth lib file, verifies the user, sets the user, and displays the bears related to that user.
      auth.getUsername()
        .then((currentUser) => {
          this.username = currentUser;
        }, handleError(this.errors, 'could not get username'));
    }.bind(this);

    this.logout = function() {
      auth.removeToken();
      this.username = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};
