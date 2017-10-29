(function (window) {
  window.__env = window.__env || {};

  // API url
  window.__env.environment = 'local';

  // API url
  window.__env.apiUrl = 'http://api.local.com:8080/api/v1/';

  // Base url
  window.__env.baseUrl = '/';

  //Rollbar AccessToken
  window.__env.rollbar = {
    enabled: false,
    accessToken: '<token-here>'
  };

  //Facebook App ID for login
  window.__env.fbAppId = '<fb-app-id>';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));