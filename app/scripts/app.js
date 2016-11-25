(function () {
  'use strict';

  var app = angular.module('big', [
    'firebase',
    'big.controllers',
    'ngMaterial',
    'big.services',
    'big.filters'
  ]);

  app.config(
    function () {

      var config = {
        apiKey: "AIzaSyCUtW0g-Y-tnFwvnInux9zg28JDGW3AUB0",
        authDomain: "big-impo.firebaseapp.com",
        databaseURL: "https://big-impo.firebaseio.com",
        storageBucket: "big-impo.appspot.com",
        messagingSenderId: "882333403830"
      };
      firebase.initializeApp(config);

    });

})();
