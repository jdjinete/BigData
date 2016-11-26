(function () {
  'use strict';

  angular.module('big.controllers', [])
    .controller('testCtrl', ['$scope', 'motosService', function ($scope, motosService) {

      $scope.data = {};
      $scope.data.cb1 = {mostrar: true, anio: 2013, id: "mapa-1"};
      $scope.data.cb2 = {mostrar: false, anio: 2014, id: "mapa-2"};
      $scope.data.cb3 = {mostrar: false, anio: 2015, id: "mapa-3"};

      $scope.tipo = {};
      $scope.tipo.uno = {mostrar: true, tipo: "Mapa", id: "mapa"};
      $scope.tipo.dos = {mostrar: false, tipo: "Dona", id: "dona"};
      $scope.tipo.tres = {mostrar: false, tipo: "Depto", id: "depto"};


      /**
       * Activa el primer Mapa
       */
      if ($scope.data.cb1.mostrar) {
        motosService.filtroPorAnio($scope.data.cb1.anio)
          .then((data) => {
            unificarDatos(data, $scope.data.cb1.id);
          });
      }

      var uno;
      var dos;
      var tres;
      var datos = [];
      datos.push(['Año', 'Cantidad por Año']);
      motosService.filtroAllAnio(2013, 900)
        .then((data) => {
          uno = data;
          datos.push(['2013', uno.length]);
          motosService.filtroAllAnio(2014, 1249)
            .then((data1) => {
              dos = data1;
              datos.push(['2014', dos.length]);
              motosService.filtroAllAnio(2015, 1758)
                .then((data3) => {
                  tres = data3;
                  datos.push(['2015', tres.length]);
                  console.log(uno.length + ", " + dos.length + ", " + tres.length);
                  console.log(datos);
                  crearGraficaDona(datos, $scope.tipo.dos.id)
                });
            });
        });

      $scope.cambiarTipoGrafica = function (tipo) {
        debugger
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


      motosService.filtroDepartamentos()
        .then(function (data) {
          crearGraficaDepartamento(data, $scope.tipo.tres.id);
        });


      function crearGraficaDepartamento(data, id) {
        let datosMapa = [];
        var temp = [];

        data.forEach(function (item) {
          var aduana = item.Aduana === 'BOG' ? 'CO-DC' : item.Aduana === 'MDE' ? 'CO-ANT' : item.Aduana === 'CTG' ? 'CO-ATL' : item.Aduana === 'BUN' ? 'CO-VAC' : item.Aduana === 'CLO' ? 'CO-VAC' : item.Aduana === 'BAQ' ? 'CO-ATL' : item.Aduana === 'STM' ? 'CO-ATL' : item.Aduana === 'IPI' ? 'CO-NAR' : item.Aduana === 'BGM' ? 'CO-NSA' : item.Aduana === 'MCA' ? 'CO-LAG' : item.Aduana === 'CUC' ? 'CO-NSA' : 1;

          datosMapa[aduana] = datosMapa[aduana] ? (datosMapa[aduana] + 1) : 1;
        });

        datosMapa = Object.keys(datosMapa).map(function (depto) {
          return [depto, datosMapa[depto]];
        });

        temp.push(['Ciudad', 'No. Ingresos']);
        datosMapa.forEach((depto) => {
          temp.push(depto);
        });


        google.charts.load('upcoming', {'packages': ['geochart']});
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
          var data = google.visualization.arrayToDataTable(temp);

          var options = {
            'title': 'Map',
            'region': 'CO',
            'resolution': 'provinces',
            'height': 500,
            'width': 969
          };

          var chart = new google.visualization.GeoChart(document.getElementById(id));
          chart.draw(data, options);
        };
      }


      function crearGraficaDona(datos, id) {
        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {

          var data = google.visualization.arrayToDataTable(datos);

          var options = {
            title: 'Porcentaje de Importaciones',
            pieHole: 0.4,
            'height': 500,
            'width': 969
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
          temp.push(pais);
        });

        google.charts.load('upcoming', {'packages': ['geochart']});
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
          var data = google.visualization.arrayToDataTable(temp);
          var options = {'height': 500, 'width': 969};
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
            unificarDatos(data, miId);
          });
      };

    }])
})();


