var App = angular.module("flandApp", ['ngRoute']);

App.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/main.html',
            controller  : 'Fland2Controller'
        })

        .when('/allprofiles', {
            templateUrl : 'pages/all.profiles.html',
            controller  : 'allProfilesController'
        })

        .when('/profile/:id/', {
            templateUrl : 'pages/profile.html',
            controller: 'profileController'
        })

        .otherwise({redirectTo:'/'});
});

App.factory('Allprofiles', function(){
  return [
    {name: "Adam", role: "Photographer", photo: "img/team/2.jpg", id:"1"},
    {name: "John", role: "Musician", photo: "img/team/3.jpg", id:"2"},
    {name: "Sam", role: "Actor", photo: "img/team/1.jpg", id:"3"},
    {name: "Rachel", role: "Web Developer", photo: "img/team/3.jpg", id:"4"},
    {name: "Joe", role: "Dancer", photo: "img/team/2.jpg", id:"5"},
    {name: "Francis", role: "Psychology", photo: "img/team/1.jpg", id:"6"}
  ]
})

var shuffleArray = function(array) {
  var m = array.length, t, i;

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

App.controller('Fland2Controller', function ($scope, $route, $location, Allprofiles) {
  var shuffledProfiles = Allprofiles; 
  $scope.profiles = shuffleArray(shuffledProfiles);

  $scope.currentPath = $location.path();

  // $scope.$on('$routeChangeSuccess', function() {
  //   var path = $location.path();
  //   if(path === '/') {
  //      console.log('home');
  //   } else if(path === '/allprofiles') {
  //      console.log('all profiles');
  //   }
  // });

});

App.controller('allProfilesController', function($scope, $route, $location, Allprofiles) {
  $scope.profiles = Allprofiles;
})

App.controller('profileController', function($scope, $route, $location, Allprofiles, $routeParams) {
  $scope.profile = Allprofiles.find( item => {
    return item.id == $routeParams.id;
  })
})

