(function () {
  'use strict';

  angular.module('big.controllers', [])
    .controller('testCtrl', ['$scope', 'motosService', function ($scope, motosService) {

      $scope.anios = [{nombre: 2014, valor: 2014}, {nombre: 2015, valor: 2015}, {nombre: 2016, valor: 2016}];

      $scope.cambiarAnio = function actualizaAnio(anio) {

      }
      motosService.filtroPorAnio(2015)
        .then((data) => {
          unificarDatos(data)
        });

      var temp = [];

      function unificarDatos(data) {

        let datosMapa = [];


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
          var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
          chart.draw(data, options);
        }
      }

      function primeraMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    }])
})();
