angular.module('authorization', [
  'ui.router',
])

.constant('_', window._)

.run(function(_, $rootScope, $state, Authorization) {

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (!Authorization.authorized) {
      if (Authorization.memorizedState && (!_.has(fromState, 'data.redirectTo') || toState.name !== fromState.data.redirectTo)) {
        Authorization.clear();
      }
      if (_.has(toState, 'data.authorization') && _.has(toState, 'data.redirectTo')) {
        if (_.has(toState, 'data.memory') && toState.data.memory) {
          Authorization.memorizedState = toState.name;
        }
        $state.go(toState.data.redirectTo);
      }
    }

  });
})

.service('Authorization', function($state) {

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
});
