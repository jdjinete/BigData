/**
 * Created by DarkKlitos on 19/11/16.
 */

(function () {
  angular.module('big.services', [])
    .factory('motosService', ['$firebaseArray', '$q',
      function ($firebaseArray, $q) {
        return {
          all: all,
          filtroPorAnio: filtroPorAnio
        };

        function all() {
          var deferred = $q.defer();
          deferred.resolve($firebaseArray(firebase.database().ref('importaciones')));
          return deferred.promise;
        }


        // function filtroPorAnio(anio) {
        //   var deferred = $q.defer();
        //   var ref = firebase.database().ref();
        //   // debugger;
        //   var messagesRef = ref.child("importaciones/");
        //   var query = messagesRef.orderByChild("Ano").equalTo(anio);
        //   deferred.resolve($firebaseArray(query));
        //   return deferred.promise;
        // }

        function filtroPorAnio(anio) {

          var ref = firebase.database().ref();
          // debugger;
          var messagesRef = ref.child("importaciones/");
          var query = messagesRef.orderByChild("Ano").equalTo(anio);
          ;
          return $firebaseArray(query);
        }


      }
    ])
})()
