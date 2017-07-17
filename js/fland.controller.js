var App = angular.module("flandApp", ['ngRoute', 'jkAngularRatingStars', 'daypilot']);

// http://52.55.165.53/fland/index.php/produto/engenheiro-de-desenvolvimento/

App.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/main.html',
      controller: 'Fland2Controller'
    })

    .when('/allprofiles', {
      templateUrl: 'pages/all.profiles.html',
      controller: 'allProfilesController'
    })

    .when('/profile/:id/', {
      templateUrl: 'pages/profile.html',
      controller: 'profileController'
    })

    .otherwise({
      redirectTo: '/'
    });
});

var shuffleArray = function (array) {
  var m = array.length,
    t, i;

  // While there remain elements to shuffle
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

App.controller('Fland2Controller', function ($scope, $route, $location, $sce) {
  var database = [];
  var query = firebase.database().ref("profiles").orderByKey();

  query.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        database.push({
          key: key,
          value: JSON.parse(childData)
        })
        $scope.$apply();
      });
    });


  var shuffledProfiles = database;
  $scope.profiles = shuffleArray(shuffledProfiles);

  $scope.currentPath = $location.path();


  $scope.renderHtml = function (html_code) {
    return $sce.trustAsHtml(html_code);
  };
});

App.controller('allProfilesController', function ($scope, $route, $location, $sce) {

  var database = [];
  var query = firebase.database().ref("profiles").orderByKey();

  query.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        database.push({
          key: key,
          value: JSON.parse(childData)
        })

        $scope.$apply();
      });
    });

  $scope.profiles = database;

  console.log($scope.profiles);

  $scope.renderHtml = function (html_code) {
    return $sce.trustAsHtml(html_code);
  };

})

App.controller('profileController', function ($scope, $route, $location, $routeParams, $sce) {
  var database = [];
  var query = firebase.database().ref("profiles").orderByKey();

  query.once("value")
    .then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();

        database.push({
          key: key,
          value: JSON.parse(childData)
        })



      });
      $scope.$apply();

      $scope.profile = database.find(item => {
        return item.value.id == $routeParams.id;
      })

      // $route.reload();
    });

  $scope.config = {
    startDate: new Date(),
    viewType: "Day"
  };

  $scope.events = [{
    start: new Date(),
    end: new Date(),
    id: DayPilot.guid(),
    text: "Primeira consulta"
  }];

  $scope.navigatorConfig = {
    selectMode: "day",
    showMonths: 3,
    skipMonths: 3,
    onTimeRangeSelected: function (args) {
      $scope.weekConfig.startDate = args.day;
      $scope.dayConfig.startDate = args.day;
      loadEvents();
    }
  };

  $scope.renderHtml = function (html_code) {
    return $sce.trustAsHtml(html_code);
  };

})