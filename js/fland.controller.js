var App = angular.module("flandApp", ['ngRoute', 'jkAngularRatingStars', 'daypilot']);

// http://52.55.165.53/fland/index.php/produto/engenheiro-de-desenvolvimento/

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
  // return [
  //   { name: "Mariana Souza", 
  //     role: "Dermatologista", 
  //     photo: "img/team/1.jpg", 
  //     id:"1", 
  //     experienceinyears: "14", 
  //     shortdescription: "Como avaliar um tratamento de estética facial para prevenir o envelhecimento?",
  //     specialization: `
  //       Especialista  em tratamentos faciais e estética de pele com Radiofrequência, peeling,  melasma, laser e botox 
  //     `,
  //     description: `
  //       Sou dermatologista com vasta experiencia em beleza e estica, tendo aplicado botox facial em mais que 600 pessoas nos últimos 15 anos. Trabalhei 4 anos numa clinica de beleza no Jardins em São Paulo, e os últimos 10 anos com clinica própria em Belo Horizonte. Tenho trabalhado com atores e famosos e com pessoas que procuram corrigir falhas estéticas. Antes de iniciar um tratamento como botox, laser ou outro procedimento de estética facial, ajudarei você a entender a diferença entre rugas, linhas de expressão, manchas, acne, poros dilatados, olheiras entre outros.

  //       Meus clientes buscam informações antes de fazer qualquer tratamento. Por isso, dou dicas bem objetivas para você, te ajudo a fazer as perguntas certas ao seu médico ou clinica, indico artigos, vídeos, sites e outras fonte com reputação sobre o assunto.  

  //       Botox
  //       Estética facial
  //       Peeling
  //       Dermatologia

  //     `,
  //     experiences: `
  //       Dermatologista  Sun Clinique (clinica própria)
  //       Profª  Escola de Estética e cosmetologia de Belo Horizonte 
  //       Certificação  (Regency Beauty Institute  USA) 

  //     `,
  //     usesinflander: "5",
  //     price: "1.40"
    
  //   }
  // ]
  return getProfiles();
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

  function getProfiles() {
    var query = firebase.database().ref("profiles").orderByKey();

    query.once("value")
      .then(function (snapshot) {
        profiles = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();

          $scope.profiles.push({
            key: key,
            value: JSON.parse(childData)
          })
        });

        return profiles;
      });
  }

});

App.controller('allProfilesController', function($scope, $route, $location, Allprofiles) {
  $scope.profiles = Allprofiles;
})

App.controller('profileController', function($scope, $route, $location, Allprofiles, $routeParams) {
  $scope.profile = Allprofiles.find( item => {
    return item.id == $routeParams.id;
  })

  $scope.config = {
      startDate: new Date(),
      viewType: "Day"
  };

  $scope.events = [
      {
          start: new Date(),
          end: new Date(),
          id: DayPilot.guid(),
          text: "Primeira consulta"
      }
  ];

  $scope.navigatorConfig = {
      selectMode: "day",
      showMonths: 3,
      skipMonths: 3,
      onTimeRangeSelected: function(args) {
          $scope.weekConfig.startDate = args.day;
          $scope.dayConfig.startDate = args.day;                            
          loadEvents();
      }
  };
})

