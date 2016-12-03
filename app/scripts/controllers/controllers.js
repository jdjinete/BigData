(function () {
  'use strict';

  angular.module('big.controllers', [])
    .controller('testCtrl', ['$scope', 'motosService', function ($scope, motosService) {

      $scope.data = {};
      $scope.data.cb1 = {mostrar: true, anio: 2013, id: "mapa-1"};
      $scope.data.cb2 = {mostrar: false, anio: 2014, id: "mapa-2"};
      $scope.data.cb3 = {mostrar: false, anio: 2015, id: "mapa-3"};
      $scope.data.cb4 = {mostrar: true, anio: 2013, id: "mapa-4"};
      $scope.data.cb5 = {mostrar: false, anio: 2014, id: "mapa-5"};
      $scope.data.cb6 = {mostrar: false, anio: 2015, id: "mapa-6"};

      $scope.tipo = {};
      $scope.tipo.uno = {mostrar: true, tipo: "Mapa", id: "mapa"};
      $scope.tipo.dos = {mostrar: false, tipo: "Dona", id: "dona"};
      $scope.tipo.tres = {mostrar: false, tipo: "Depto", id: "depto"};
      $scope.tipo.cuatro = {mostrar: false, tipo: "Tend", id: "tend"};

      $scope.imp = {};
      $scope.imp.uno = {mostrar: true, tipo: "Mapa", id: "mapa-bici"};
      $scope.imp.dos = {mostrar: false, tipo: "Dona", id: "dona-bici"};
      $scope.imp.tres = {mostrar: false, tipo: "Depto", id: "depto-bici"};
      $scope.imp.cuatro = {mostrar: false, tipo: "Tend", id: "tend-bici"};


      /**
       * Activa el primer Mapa
       */
      if ($scope.data.cb1.mostrar) {
        motosService.filtroPorAnio($scope.data.cb1.anio)
          .then((data) => {
            console.log(data)
            unificarDatos(data, $scope.data.cb1.id);

          });
      }


      var uno;
      var dos;
      var tres;
      var datos = [];
      datos.push(['Año', 'Cantidad por Año']);
      motosService.filtroAllAnio(2013, 458)
        .then((data) => {
          uno = data;
          datos.push(['2013', uno.length]);
          motosService.filtroAllAnio(2014, 895)
            .then((data1) => {
              dos = data1;
              datos.push(['2014', dos.length]);
              motosService.filtroAllAnio(2015, 1254)
                .then((data3) => {
                  tres = data3;
                  datos.push(['2015', tres.length]);
                  crearGraficaDona(datos, $scope.tipo.dos.id);
                  crearGraficaTendencia(datos, $scope.tipo.cuatro.id);
                });
            });
        });

      $scope.cambiarTipoGrafica = function (tipo) {
        if (tipo === 'mapa') {
          $scope.tipo.dos.mostrar = false;
          $scope.tipo.tres.mostrar = false;
          $scope.tipo.cuatro.mostrar = false;
        } else if (tipo === 'dona') {
          $scope.tipo.uno.mostrar = false;
          $scope.tipo.tres.mostrar = false;
          $scope.tipo.cuatro.mostrar = false;
        } else if (tipo === 'depto') {
          $scope.tipo.uno.mostrar = false;
          $scope.tipo.dos.mostrar = false;
          $scope.tipo.cuatro.mostrar = false;
        } else {
          $scope.tipo.uno.mostrar = false;
          $scope.tipo.dos.mostrar = false;
          $scope.tipo.tres.mostrar = false;
        }

      };


      motosService.filtroDepartamentos()
        .then(function (data) {
          crearGraficaDepartamento(data, $scope.tipo.tres.id);
        });


      /**
       * Metodo que crea la grafica por Departamentos
       * @param data
       * @param id
       */
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
            'width': 906
          };

          var chart = new google.visualization.GeoChart(document.getElementById(id));
          chart.draw(data, options);
        };
      }

      /**
       * Metodo que crea la grafica de Tipo Dona
       * @param datos
       * @param id
       */
      function crearGraficaDona(datos, id) {
        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {

          var data = google.visualization.arrayToDataTable(datos);

          var options = {
            title: 'Porcentaje de Importaciones',
            pieHole: 0.4,
            'height': 500,
            'width': 906
          };

          var chart = new google.visualization.PieChart(document.getElementById(id));
          chart.draw(data, options);
        }

      }

      /**
       * Metodo encargado de crear la grafica de tendencia
       * @param datos
       * @param id
       */
      function crearGraficaTendencia(datos, id) {
        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          datos.shift();
          var temp = [];
          temp.push(['Año', 'No. Importaciones']);
          datos.forEach((anio) => {
            temp.push(anio);
          });

          console.log(temp);

          var data = google.visualization.arrayToDataTable(temp);

          var options = {
            title: 'Tendencia de Importaciones',
            'height': 500,
            'width': 906
          };

          var chart = new google.visualization.LineChart(document.getElementById(id));
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
          var options = {'height': 500, 'width': 906};
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


