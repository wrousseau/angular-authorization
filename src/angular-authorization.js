angular.module('authorization', [
  'ui.router',
])

.run(['$rootScope', '$state', 'Authorization', function($rootScope, $state, Authorization) {

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (!Authorization.authorized) {
      if (Authorization.memorizedState && (!fromState.data || !fromState.data.redirectTo || toState.name !== fromState.data.redirectTo)) {
        Authorization.clear();
      }
      if (toState.data && toState.data.authorization && toState.data.redirectTo) {
        if (toState.data.memory) {
          Authorization.memorizedState = toState.name;
        }
        $state.go(toState.data.redirectTo);
      }
    }

  });
}])

.service('Authorization', ['$state', function($state) {

  this.authorized = false,
  this.memorizedState = null;

  var
  clear = function() {
    this.authorized = false;
    this.memorizedState = null;
  },

  go = function(fallback) {
    this.authorized = true;
    var targetState = this.memorizedState ? this.memorizedState : fallback;
    $state.go(targetState);
  };

  return {
    authorized: this.authorized,
    memorizedState: this.memorizedState,
    clear: clear,
    go: go
  };
}]);
