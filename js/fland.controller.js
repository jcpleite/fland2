var App = angular.module("flandApp", ['ngRoute']);

App.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'pages/main.html',
            controller  : 'Fland2Controller'
        })

        // route for the about page
        .when('/allprofiles', {
            templateUrl : 'pages/all.profiles.html',
            controller  : 'allProfilesController'
        })
});

App.controller('Fland2Controller', function ($scope, $route, $location) {
  $scope.profiles = [
    {name: "Adam", role: "Photographer", photo: "img/team/2.jpg", id:"1"},
    {name: "John", role: "Musician", photo: "img/team/3.jpg", id:"1"},
    {name: "Sam", role: "Actor", photo: "img/team/1.jpg", id:"1"}
  ];

  $scope.currentPath = $location.path();

  $scope.$on('$routeChangeSuccess', function() {
    var path = $location.path();
    if(path === '/') {
       console.log('home');
    } else if(path === '/allprofiles') {
       console.log('all profiles');
    }
  });

});

App.controller('allProfilesController', function($scope, $route, $location) {
  $scope.profiles = [
    {name: "Adam", role: "Photographer", photo: "img/team/2.jpg", id:"1"},
    {name: "John", role: "Musician", photo: "img/team/3.jpg", id:"1"},
    {name: "Sam", role: "Actor", photo: "img/team/1.jpg", id:"1"},
    {name: "Rachel", role: "Web Developer", photo: "img/team/3.jpg", id:"1"},
    {name: "Joe", role: "Dancer", photo: "img/team/2.jpg", id:"1"},
    {name: "Francis", role: "Psychology", photo: "img/team/1.jpg", id:"1"}
  ];
})
