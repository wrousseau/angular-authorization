# angular-authorization

> Basic state authorization with Angular UIRouter

Angular Authorization provides a simple way to include states that require authorization.
Current features include:

- Preventing access to specified states
- Redirecting to another state when lacking authorization
- Remembering the state the user tried to access to immediately redirect to it once authentified

## Requirements

[AngularUI Router](https://github.com/angular-ui/ui-router) is required.

## Installation

You can install the package with Bower and add it to your dependencies:

`bower install --save angular-authorization`

Make sure you include the following script tags (you can pick the minified version if wanted)

```html
  <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
  <script src="bower_components/angular-authorization/release/angular-authorization.js"></script>
```

Finaly make sure it is included in your module dependencies:

```javascript
angular.module('myApp', ['ui.router', ..., 'authorization']);
```

## Usage

Angular Authorization includes the `Authorization` service which includes two properties :

- `authorized`: a boolean determining wether or not the user is currently authorized to access restricted routes.
- `memorizedState`: a string being the name of the state the user was last trying to reach.

It also provides two functions:

- `clear()` which clears both properties
- `go(fallback)` which is to be called when the user logs in with success. It authorizes the user, and also performs a `$state.go`, except that it tries to use the memorized state if available, relying on the given state fallback argument if not.

Angular Authorization also enriches the AngularUI Router in the way depicted in this configuration example:

```javascript
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    template: '<h1>Home</h1>'
  })
  .state("login", {
    url: "/login",
    template: '<button ng-click="onLogin()">Login</button>',
    controller: function($scope, $state, Authorization) {
      $scope.onLogin = function() {
        Authorization.go('private');
      };
    }
  })
  .state('private', {
    url: '/private',
    template: '<h1>Private</h1>',
    data: {
      authorization: true,
      redirectTo: 'login'
    }
  })
  .state('secret', {
    url: '/secret',
    template: '<h1>Secret</h1>',
    data: {
      authorization: true,
      redirectTo: 'login',
      memory: true
    }
  });
})
```

The following flags can be added to any state's data object :

- `authorization` marks the state as requiring authorization
- `redirectTo` can be any non-restricted state on which the user is to be redirected if trying to access a restricted state. Its presence is required if `authorization` is truthy.
- `memory`, if truthy, means that if the user tries to reach this restricted state, is redirected to the `redirectTo` state and succesfully gets authorized (`Authorization.go` called), he/she will be redirected to this state (which was the initial goal)

## Demo

A simple demo is given in this [Plunker](http://codepen.io/anon/pen/OVrvVX).

## Contributing

Angular Authorization is still under development. Bug reports, pull requests and feature requests are more than welcome.

If you require a more complex role system, for instance where several roles can exist, [Angular Permission](https://github.com/Narzerus/angular-permission) is a good alternative.

## Roadmap

- Unit testing / 100% Coverage
- Ngdoc
- Code Climate
