var mp4Controllers = angular.module('mp4Controllers', ['720kb.datepicker']);


mp4Controllers.controller('UserController', ['$scope', '$http', 'User', 'Tasks', 'Task', 'AlertService', '$window', '$routeParams', function($scope, $http, User, Tasks, Task, AlertService, $window, $routeParams) {
  User.get(function(data) {
    $scope.user = data.data;
    var assignedUser = "{'assignedUser': '"+$scope.user._id+"', 'completed': false}";

    Tasks.getAssignedUsers(function(data) {
      $scope.tasks = data.data;
    }, assignedUser);
  });

  $scope.complete = function(taskID) {
    Task.getGivenID(function(data) {
      var taskObj = data.data;

      taskObj.completed = true;

      // console.log(JSON.stringify(taskObj));
      Task.editComplete(function(data, successMsg) {
         var task_index = $scope.user.pendingTasks.indexOf(taskObj._id);
         
         if (task_index > -1) {
           $scope.user.pendingTasks.splice(task_index, 1);
         }
  
         console.log(JSON.stringify($scope.user));
  
         User.editComplete(function(data, successMsg) {
            console.log(successMsg);
            $scope.status = successMsg;
            AlertService.setSuccess({ show: true, msg: 'Task has been updated successfully.' });
            
         }, $scope.user);
      }, taskObj);
    }, taskID);
  };

  $scope.load_complete = function() {
    var assignedUserComplete = "{'assignedUser': '"+$scope.user._id+"', 'completed': true}";

    Tasks.getAssignedUsers(function(data) {
      $scope.tasks_complete = data.data;
    }, assignedUserComplete);
  }

  if (AlertService.hasAlert()) {
    $scope.success = AlertService.getSuccess();
    AlertService.reset();
  }
}]);

mp4Controllers.controller('UsersController', ['$scope', '$http', 'Users', 'User', 'Task', 'Tasks', 'AlertService', '$window' , function($scope, $http, Users, User, Task, Tasks, AlertService, $window) {
  Users.get(function(data) {
    $scope.users = data.data;
  });

  $scope.deleteUser = function(user) {

    var assignedUser = "{'assignedUser': '"+user._id+"'}";
    
    Tasks.getAssignedUsers(function(data) {
      var newAssignedUser = "{'assignedUser': ''}";
      var newAssignedUserName = "{'assignedUserName': 'unassigned'}";

      var tasks_array = data.data;
      
      for (var i = 0; i < tasks_array.length; i++) {
        tasks_array[i].assignedUser = '';
        tasks_array[i].assignedUserName = 'unassigned';

        Task.editComplete(function(data) {
          console.log('task edit complete!');
        }, tasks_array[i]);
      }
    }, assignedUser);

    User.delete(function(data, successMsg) {
      $scope.status = successMsg;
      console.log(successMsg);
      
      AlertService.setSuccess({ show: true, msg: 'User has been deleted successfully.' });
    
    }, user);
  };

  if (AlertService.hasAlert()) {
    $scope.success = AlertService.getSuccess();
    AlertService.reset();
  }
}]);

mp4Controllers.controller('UserAddController', ['$scope', '$http', 'User', '$window' , function($scope, $http, User, $window) {
  $scope.User = {};
  $scope.status = "";

  //$scope.valid = 

  $scope.submit = function() {
    
    User.create(function(data, successMsg) {
      console.log(successMsg);
       $scope.status = successMsg;
    }, $scope.User);
  }
}]);

mp4Controllers.controller('UserEditController', ['$scope', '$http', 'User', 'AlertService', '$window', '$routeParams', function($scope, $http, User, AlertService, $window, $routeParams) {
  $scope.status = "";

  User.get(function(data) {
    $scope.User = data.data;
  });

  $scope.submit = function() {
    
    User.edit(function(data, successMsg) {
      console.log(successMsg);
      $scope.status = successMsg;
    }, $scope.User);

    
  }
}]);

mp4Controllers.controller('TaskController', ['$scope', '$http', 'Task', 'AlertService', '$window', '$routeParams', function($scope, $http, Task, AlertService, $window, $routeParams) {
  Task.get(function(data) {
    $scope.task = data.data;
  })

  $scope.incomplete = function(taskID) {
    console.log('taskID: '+taskID);

    $scope.task.completed = false;

      // console.log(JSON.stringify(taskObj));
      Task.editComplete(function(data, successMsg) {
        console.log(successMsg);
            $scope.status = successMsg;
  
            AlertService.setSuccess({ show: true, msg: 'Task has been updated successfully.' });
     

      }, $scope.task);
  };

  if (AlertService.hasAlert()) {
    $scope.success = AlertService.getSuccess();
    AlertService.reset();
  }
}]);

mp4Controllers.controller('TasksController', ['$scope', '$http', 'Tasks', 'Task', 'User', 'AlertService', '$window' , function($scope, $http, Tasks, Task, User, AlertService, $window) {
  /* SORTING */
  $scope.order_by = 1;
  $scope.sort_by = "name";

  

  $scope.sort = function () {
    var sortParam = "{'"+$scope.sort_by+"': "+$scope.order_by+"}";  
    console.log(sortParam);
    Tasks.getSort(function(data) {
      data.data.pop();
      $scope.tasks = data.data;
    }, $scope.page, task_type, sortParam);
  };


  $scope.page = 1;
  $scope.prev_disabled = true;
  $scope.task_type = 'pending';

  var task_type = {};

  /* Task types */
  if ($scope.task_type == 'pending')
    task_type = "{'completed': false}";
  else if ($scope.task_type == 'completed')
    task_type = "{'completed': true}";
  else
    task_type = null;

  /* GET request */
  Tasks.get(function(data) {
    data.data.pop();
    $scope.tasks = data.data;
  }, $scope.page, task_type);

  /* Prev page */
  $scope.prevPage = function() {
    $scope.page -= 1;

    if ($scope.page == 1)
      $scope.prev_disabled = true;
    else
      $scope.prev_disabled = false;

    $scope.next_disabled = false;

    Tasks.get(function(data) {
      data.data.pop();
      $scope.tasks = data.data;
    }, $scope.page, task_type);
  }

  /* Next page */
  $scope.nextPage = function() {
    $scope.page += 1;

    $scope.prev_disabled = false;

    Tasks.get(function(data) {
      if (data.data.length == 11) {
        $scope.next_disabled = false;
        data.data.pop();
      }
      else
        $scope.next_disabled = true;

      $scope.tasks = data.data;
    }, $scope.page, task_type);
  }

  /* Update */
  $scope.update = function() {
    $scope.page = 1;

    if ($scope.task_type == 'pending')
      task_type = "{'completed': false}";
    else if ($scope.task_type == 'completed')
      task_type = "{'completed': true}";
    else
      task_type = null;

    Tasks.get(function(data) {
      if (data.data.length == 11) {
        $scope.next_disabled = false;
        data.data.pop();
      }
      else
        $scope.next_disabled = true;
      $scope.tasks = data.data;
    }, $scope.page, task_type);
  }

  /* Delete Task */
  $scope.deleteTask = function(task) {
    
    if (task.assignedUser != "unassigned" && task.assignedUser != "") {
        User.getName(function(data) {
           var userObj = data.data;
    
           var task_index = userObj.pendingTasks.indexOf(task._id);
    
           if (task_index > -1) {
               userObj.pendingTasks.splice(task_index, 1);
           }
    
           console.log(JSON.stringify(userObj));
    
           User.editComplete(function(data) {
                console.log('User pendingTasks updated!');
           }, userObj);
    
        }, task.assignedUser);


        Task.delete(function(data, successMsg) {
          $scope.status = successMsg;
    
          AlertService.setSuccess({ show: true, msg: 'Task has been deleted successfully.' });
      
        }, task);

    } else {

      var username = "{'name': '"+task.assignedUserName+"'}";
      console.log(username);
       
 // 
        
      //   //console.log(' ' + $scope.Task.assignedUser);
        Task.delete(function(data, successMsg) {
  
            $scope.status = successMsg;
    
            AlertService.setSuccess({ show: true, msg: 'Task has been updated successfully.' });
           
    
         }, task);
  
 

    }
  };

  if (AlertService.hasAlert()) {
    $scope.success = AlertService.getSuccess();
    AlertService.reset();
  }
}]);

mp4Controllers.controller('TaskAddController', ['$scope', '$http', 'Task', 'Users', '$window' , function($scope, $http, Task, Users, $window) {
  $scope.Task = {'completed': false};
  $scope.status = "";

  Users.get(function(data) {
    $scope.users = data.data;
  });

  $scope.submit = function() {
    
    Task.create(function(data, successMsg) {
      console.log(successMsg);
       $scope.status = successMsg;
    }, $scope.Task);
  }
}]);

mp4Controllers.controller('TaskEditController', ['$scope', '$http', 'Task', 'Users', 'User', 'AlertService', '$window', '$location', '$routeParams', function($scope, $http, Task, Users, User, AlertService, $window, $location, $routeParams) {
  $scope.status = "";

  Task.get(function(data) {
    $scope.Task = data.data;
  });

  Users.get(function(data) {
    $scope.users = data.data;
  });

  if (AlertService.hasAlert()) {
    $scope.success = AlertService.getSuccess();
    AlertService.reset();
  }

  $scope.submit = function() {
    console.log('$scope.Task.assignedUser'+$scope.Task.assignedUser);

    if ($scope.Task.assignedUser != "unassigned" && $scope.Task.assignedUser != "") {
    User.getName(function(data) {
       $scope.Task.assignedUser = data.data._id;
       console.log('$scope.Task = ' + JSON.stringify($scope.Task));

       var userObj = data.data;

       var user_pending_tasks = data.data.pendingTasks;
       user_pending_tasks.push($scope.Task._id);

       console.log(user_pending_tasks);

      Task.editComplete(function(data, successMsg) {
        console.log('Task edit complete!');
        $scope.status = successMsg;
        AlertService.setSuccess({ show: true, msg: 'Task has been updated successfully.' });
        /* Add to User's pendingTasks */
        User.editComplete(function(data) {
          console.log('User edit complete!');
          
          
        }, userObj);
        AlertService.setSuccess({ show: true, msg: 'Task has been updated successfully.' });
      }, $scope.Task);
    }, $scope.Task.assignedUser);

  } else {
    
    var username = "{'name': '"+$scope.Task.assignedUserName+"'}";
    console.log(username);
    User.getID(function(data) {
      $scope.Task.assignedUser = data.data[0]._id;
      
      //console.log(' ' + $scope.Task.assignedUser);
      Task.editComplete(function(data, successMsg) {
          console.log(JSON.stringify(data));
          $scope.status = successMsg;
  
          AlertService.setSuccess({ show: true, msg: 'Task has been updated successfully.' });
         
  
      }, $scope.Task);

    }, username);


    
    
   }
  }


}]);

mp4Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };
}]);
