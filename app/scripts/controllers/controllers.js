(function () {
  'use strict';

  angular.module('big.controllers', [])
    .controller('testCtrl', ['$scope', 'motosService', function ($scope, motosService) {

      $scope.data = {};
      $scope.data.cb1 = {mostrar: true, anio: 2013, id: "mapa-1"};
      $scope.data.cb2 = {mostrar: false, anio: 2014, id: "mapa-2"};
      $scope.data.cb3 = {mostrar: false, anio: 2015, id: "mapa-3"};

      $scope.tipo = {};
      $scope.tipo.uno = {mostrar: false, tipo: "Mapa", id: "mapa"};
      $scope.tipo.dos = {mostrar: true, tipo: "Dona", id: "dona"};
      $scope.tipo.tres = {mostrar: false, tipo: "def", id: "def"};


      /**
       * Activa el primer Mapa
       */
      if ($scope.data.cb1.mostrar) {
        motosService.filtroPorAnio($scope.data.cb1.anio)
          .then((data) => {
            unificarDatos(data, $scope.data.cb1.id)
          });
      }

      var uno;
      var dos;
      var tres;
      var datos = [];
      datos.push(['Año', 'Cantidad por Año']);
      motosService.filtroAllAnio(2013)
        .then((data) => {
          debugger
          uno = data;
          datos.push(['2013', uno.length]);
          motosService.filtroAllAnio(2014)
            .then((data1) => {
              debugger
              dos = data1;
              datos.push(['2014', dos.length]);
              motosService.filtroAllAnio(2015)
                .then((data3) => {
                  debugger
                  tres = data3;
                  datos.push(['2015', tres.length]);
                  console.log(uno.length + ", " + dos.length + ", " + tres.length)
                  console.log(datos);
                  crearGraficaDona(datos, $scope.tipo.dos.id)
                });
            });
        });

      $scope.cambiarTipoGrafica = function (tipo) {

        if (tipo === 'mapa') {
          $scope.tipo.dos.mostrar = false;
          $scope.tipo.tres.mostrar = false;
        } else if (tipo === 'dona') {
          $scope.tipo.uno.mostrar = false;
          $scope.tipo.tres.mostrar = false;
        } else {
          $scope.tipo.uno.mostrar = false;
          $scope.tipo.dos.mostrar = false;
        }

      };


      function crearGraficaDona(datos, id) {
        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          // var data = google.visualization.arrayToDataTable([
          //   ['Task', 'Hours per Day'],
          //   ['2013', 500],
          //   ['2014', 500],
          //   ['2015', 500]
          // ]);

          var data = google.visualization.arrayToDataTable(datos);

          var options = {
            title: 'Porcentaje de Importaciones',
            pieHole: 0.4,
          };

          var chart = new google.visualization.PieChart(document.getElementById(id));
          chart.draw(data, options);
        }

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
