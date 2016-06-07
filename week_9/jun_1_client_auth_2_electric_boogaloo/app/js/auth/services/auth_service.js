var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service
    return {
      // This function removes the token that is stored when the user logs in or signs up. It removes any trace of it from local storage, and anywhere that it is stored to make sure that it cannot be accessed if a user does not close the browser after signing out. It sets the value for the token anywhere that it is saved to null, with an exception of localstorage, which it sets to an empty string.
      removeToken: function() {
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      // This function saves the token into local storage and also in this.token and the header token, and it returns the token upon completion of saving the value of these to the token string.
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      // this function returns the token if it exists, or if it has not been set yet, it calls the previous function (saveToken) which sets the token and than returns this.token.
      getToken: function() {
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      // this function allows asynchronious function calls. It checks if the username has been set, and if this.token exists. If it does not exist, it gives an error. It than makes a get to profile, which is an authrouter route, which sends the user name and sets this.username to the response sent back from the route and binds the data so that it is accessible once the function is called either by signup or signin controller, so that authentication can be made.
      getUsername: function() {
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));

          $http.get(baseUrl + '/api/profile')
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};
// The data that is being stored with this service is the token, and also the user that is signing up or signing in. It does this so that the correct bears can, and will be shown when the user finally makes his way to /bears.
