var app = angular.module('mp4', ['ngRoute', 'mp4Controllers', 'mp4Services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/users/add', {
    templateUrl: 'partials/addUser.html',
    controller: 'UserAddController'
  })
  .when('/users', {
    templateUrl: 'partials/users.html',
    controller: 'UsersController'
  })
  .when('/users/:id', {
    templateUrl: 'partials/user.html',
    controller: 'UserController'
  })
  .when('/users/edit/:id', {
    templateUrl: 'partials/editUser.html',
    controller: 'UserEditController'
  })
  .when('/tasks/add', {
    templateUrl: 'partials/addTask.html',
    controller: 'TaskAddController'
  })
  .when('/tasks', {
    templateUrl: 'partials/tasks.html',
    controller: 'TasksController'
  })
  .when('/tasks/:id', {
    templateUrl: 'partials/task.html',
    controller: 'TaskController'
  })
  .when('/tasks/edit/:id', {
    templateUrl: 'partials/editTask.html',
    controller: 'TaskEditController'
  })
  .when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  })
  
  .otherwise({
    redirectTo: '/settings'
  });
}]);
