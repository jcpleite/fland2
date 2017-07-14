var App = angular.module('adminFland', ['ngSanitize']);

App.controller("adminController", function ($scope, $sce) {
  console.log("running");

  var profiles = new Array;

  $(document).ready(function () {
    getProfiles();
  });


  $scope.saveProfile = function () {
    console.log("clicked");

    var profile = {
      id: guid(),
      name: $('#name').val(),
      description: $('#description').summernote('code'),
      title: $('#title').val(),
      expertise: $('#expertise').summernote('code'),
      professionalExperiences: $('#profissional-experiences').summernote('code'),
      experienceinyears: $('#experienceinyears').val(),
      price: $('#price').val(),
      howtocontact: $('#howtocontact').summernote('code'),
    }
    profiles.push(profile);

    var profilesJSON = JSON.stringify(profiles);
    console.log(profilesJSON);

    // now just save this in your bank 

    var record = firebase.database().ref().child('profiles').push(JSON.stringify(profile));

    if (record.key) {
      $('#addProfile').modal('toggle');
      getProfiles();
    } else {
      alert(Error)
    }
  }

  $scope.deleteProfile = function (key) {
    console.log(key);
    firebase.database().ref().child('profiles').child(key).remove();
    getProfiles();
  }

  $scope.renderHtml = function (html_code) {
    return $sce.trustAsHtml(html_code);
  };


  $('#editProfile').on('show.bs.modal', function (e) {
    var profileID = $(e.relatedTarget).data('id');

    var profile = $scope.profiles.filter(function (profile) {
      return profile.key === profileID;
    })

    console.log(profile[0].value);

    $('#profilename').val(profile[0].value.name);
    $('#profiledescription').summernote('code', profile[0].value.description);
    $('#profiletitle').val(profile[0].value.title);
    $('#profileexpertise').summernote('code', profile[0].value.expertise);
    $('#profileprofissional-experiences').summernote('code', profile[0].value.professionalExperiences);
    $('#profileexperienceinyears').val(profile[0].value.experienceinyears);
    $('#profileprice').val(profile[0].value.price);
    $('#profilehowtocontact').summernote('code', profile[0].value.howtocontact);


  });


  function getProfiles() {
    var query = firebase.database().ref("profiles").orderByKey();

    query.once("value")
      .then(function (snapshot) {
        $scope.profiles = [];
        snapshot.forEach(function (childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();

          $scope.profiles.push({
            key: key,
            value: JSON.parse(childData)
          })
        });
        console.log($scope.profiles);
        $scope.$apply();
      });
  }

})

// generate ID
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
