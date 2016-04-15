var mp4Services = angular.module('mp4Services', []);

mp4Services.factory('User', function($http, $window, $routeParams){
    return {
        get : function(callback) {
            var baseUrl = $window.sessionStorage.baseurl;
            var userID = $routeParams.id;
            return $http.get(baseUrl+'/api/users/'+userID).success(function(data) {
                callback(data);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        create : function(callback, userData) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/api/users', userData).success( function(data) {
                var successMsg = "User created!";
                callback(data, successMsg);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        edit : function(callback, userData) {
            var baseUrl = $window.sessionStorage.baseurl;
            var userID = $routeParams.id;
            console.log('userData: ' + JSON.stringify(userData));
            return $http.put(baseUrl+'/api/users/'+userID, userData, {headers: {"Content-Type": "application/json;charset=utf-8","Accept": "application/json, text/plain, */*"}}).success( function(data) {
                var successMsg = "User edited!";
                callback(data, successMsg);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        editComplete : function(callback, userData) {
            var baseUrl = $window.sessionStorage.baseurl;
            var userID = userData._id;
            
            return $http.put(baseUrl+'/api/users/'+userID, userData, {headers: {"Content-Type": "application/json;charset=utf-8","Accept": "application/json, text/plain, */*"}}).success( function(data) {
                var successMsg = "User edited!";
                callback(data, successMsg);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        delete : function(callback, userData) {
            var baseUrl = $window.sessionStorage.baseurl;
            var userID = userData._id;
            console.log('userData: ' + JSON.stringify(userData));
            return $http.delete(baseUrl+'/api/users/'+userID, userData, {headers: {"Content-Type": "application/json;charset=utf-8","Accept": "application/json, text/plain, */*"}}).success( function(data) {
                var successMsg = "User deleted!";
                callback(data, successMsg);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        getName : function(callback, userID) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/users/'+userID).success(function(data) {
                callback(data);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        getID : function(callback, name) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/users?where='+name).success(function(data) {
                callback(data);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },
    }
});

mp4Services.factory('Users', function($http, $window) {
    return {
        get : function(callback) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/users').success(function(data) {
                callback(data);
            });
        }
    }
});

mp4Services.factory('Task', function($http, $window, $routeParams){
    return {
        get : function(callback) {
            var baseUrl = $window.sessionStorage.baseurl;
            var taskID = $routeParams.id;
            return $http.get(baseUrl+'/api/tasks/'+taskID).success(function(data) {
                callback(data);
            });
        },

        getGivenID : function(callback, taskID) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/tasks/'+taskID).success(function(data) {
                callback(data);
            });
        },

        create : function(callback, taskData) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/api/tasks', taskData).success( function(data) {
                var successMsg = "Task created!";
                callback(data, successMsg);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        edit : function(callback, taskData) {
            var baseUrl = $window.sessionStorage.baseurl;
            var taskID = $routeParams.id;
            return $http.put(baseUrl+'/api/tasks/'+taskID, taskData, {headers: {"Content-Type": "application/json;charset=utf-8","Accept": "application/json, text/plain, */*"}}).success( function(data) {
                var successMsg = "Task edited!";
                callback(data, successMsg);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        editComplete : function(callback, taskData) {
            var baseUrl = $window.sessionStorage.baseurl;
            var taskID = taskData._id;
            console.log('taskID: '+taskID);
            return $http.put(baseUrl+'/api/tasks/'+taskID, taskData, {headers: {"Content-Type": "application/json;charset=utf-8","Accept": "application/json, text/plain, */*"}}).success( function(data) {
                var successMsg = "Task edited!";
                callback(data, successMsg);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        },

        delete : function(callback, taskData) {
            var baseUrl = $window.sessionStorage.baseurl;
            var taskID = taskData._id;
            return $http.delete(baseUrl+'/api/tasks/'+taskID, taskData, {headers: {"Content-Type": "application/json;charset=utf-8","Accept": "application/json, text/plain, */*"}}).success( function(data) {
                var successMsg = "Task deleted!";
                callback(data, successMsg);
            }).error(function(data) {
                console.log('Error: ' + data);
            });
        }
    }
});

mp4Services.factory('Tasks', function($http, $window) {
    return {
        get : function(callback, page, task_type) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/tasks?skip='+10*(page-1)+'&limit=11&where='+task_type).success(function(data) {
                callback(data);
            });
        },

        getSort : function(callback, page, task_type, sort) {
            var baseUrl = $window.sessionStorage.baseurl;
            
            return $http.get(baseUrl+'/api/tasks?skip='+10*(page-1)+'&limit=11&where='+task_type+'&sort='+sort).success(function(data) {
                callback(data);
            });
        },

        getAssignedUsers : function(callback, assignedUser) {
            console.log(assignedUser);
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/tasks?where='+assignedUser).success(function(data) {
                callback(data);
            });
        }
    }
});

mp4Services.factory('AlertService', function () {
  var success = {},
      error = {},
      alert = false;
  return {
    getSuccess: function () {
      return success;
    },
    setSuccess: function (value) {
      success = value;
      alert = true;
    },
    getError: function () {
      return error;
    },
    setError: function (value) {
      error = value;
      alert = true;
    },
    reset: function () {
      success = {};
      error = {};
      alert = false;
    },
    hasAlert: function () {
      return alert;
    }
  }
});