(function () {
  'use strict';

  angular.module('big.controllers', [])
    .controller('testCtrl', ['$scope', 'motosService', function ($scope, motosService) {

      $scope.data = {};
      $scope.data.cb1 = {mostrar: true, anio: 2013, id: "mapa-1"};
      $scope.data.cb2 = {mostrar: false, anio: 2014, id: "mapa-2"};
      $scope.data.cb3 = {mostrar: false, anio: 2015, id: "mapa-3"};

      /**
       * Activa el primer Mapa
       */
      if ($scope.data.cb1.mostrar) {
        motosService.filtroPorAnio($scope.data.cb1.anio)
          .then((data) => {
            unificarDatos(data, $scope.data.cb1.id)
          });
      }


      /**
       * Metodo que crea las graficas
       * @param data
       * @param id
       */
      function unificarDatos(data, id) {

        let datosMapa = [];
        var temp = [];

        data.forEach(function (item) {
          var pais = primeraMayuscula((item.Paisdeorigen).toLowerCase());
          datosMapa[pais] = datosMapa[pais] ? (datosMapa[pais] + 1) : 1;
        });

        datosMapa = Object.keys(datosMapa).map(function (pais) {
          return [pais, datosMapa[pais]];
        });

        $scope.datosImpo = data;

        temp.push(['Country', 'Exportador']);
        datosMapa.forEach((pais) => {
          temp.push(pais)
        });

        google.charts.load('upcoming', {'packages': ['geochart']});
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
          debugger;
          console.log(temp);
          var data = google.visualization.arrayToDataTable(temp);
          var options = {};
          var chart = new google.visualization.GeoChart(document.getElementById(id));
          chart.draw(data, options);
        }
      }

      /**
       * Metodo que cambia la letra como capital
       * @param string
       * @returns {string}
       */
      function primeraMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      /**
       * Metodo que muestra los mapas por año
       * @param id
       * @param item
       * @param anio
       */
      $scope.activarMapa = function (id, item, anio) {
        console.log(item);
        var miId = id;
        motosService.filtroPorAnio(anio)
          .then((data) => {
            unificarDatos(data, miId)
          });
      };

    }])
})();
