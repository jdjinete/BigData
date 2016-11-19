(function () {
  'use strict';

  angular.module('big.controllers', [])
    .controller('testCtrl', ['$scope', 'motosService', function ($scope, motosService) {

      $scope.datosImpo = motosService.filtroPorAnio(2013);

      // motosService.filtroPorAnio(2014)
      // // motosService.all()
      //   .then((data) => {
      //     if (data[0] !== null) {
      //       var temp;
      //       temp = data[0];
      //       console.log(temp);
      //     }
      //   });


      var datos = [{
        "Aduana": "MEDELLIN",
        "Cantidad": 96,
        "CiudadProveedor": "WENLING",
        "CodigoImportador": 8909133217,
        "CodigoPartida": 8711900020,
        "ContinenteCompra": "ASIA",
        "ContinenteOrigen": "ASIA",
        "DepartamentoDestino": "ANTIOQUIA",
        "DepartamentoImportador": "ANTIOQUIA",
        "DescripcionPartidaArancelaria": "Bicicletas con motor elEctrico",
        "FechaAceptacion": "06/01/2015",
        "FletesUSD": 1800,
        "NitImportador": 890913321,
        "PaisCompra": "CHINA",
        "PaisExportador": "CHINA",
        "PaisProcedencia": "CHINA",
        "Paisorigen": "CHINA",
        "PorcentajeArancel": 15,
        "PorcentajeIVA": 16,
        "RazonSocialImportador": "PREMAC S.A.S",
        "Total": 42623000,
        "TotalArancel": 19142000,
        "TotalIVA": 23481000,
        "Valor CIFUSD": 53339.01,
        "ValorCIFCOP": 1.276114479E8,
        "ValorFOBCOP": 1.230684534E8,
        "ValorFOBUSD": 51440.13,
        "ViaTransporte": "TRANSPORTE MARITIMO",
        "fila": 1
      }, {
        "Aduana": "BUENAVENTURA",
        "Cantidad": 4,
        "CiudadProveedor": "MONTEVIDEO",
        "CodigoImportador": 9004345324,
        "CodigoPartida": 8711900020,
        "ContinenteCompra": "AMERICA",
        "ContinenteOrigen": "ASIA",
        "DepartamentoDestino": "CALDAS",
        "DepartamentoImportador": "CALDAS",
        "DescripcionPartidaArancelaria": "Bicicletas con motor elEctrico",
        "FechaAceptacion": "07/01/2015",
        "FletesUSD": 154.24,
        "NitImportador": 900434532,
        "PaisCompra": "URUGUAY",
        "PaisExportador": "URUGUAY",
        "PaisProcedencia": "TAIWAN",
        "Paisorigen": "TAIWAN",
        "PorcentajeArancel": 15,
        "PorcentajeIVA": 16,
        "RazonSocialImportador": "SPECIALIZED COLOMBIA S.A.S.",
        "Total": 5999000,
        "TotalArancel": 2694000,
        "TotalIVA": 3305000,
        "Valor CIFUSD": 7507.57,
        "ValorCIFCOP": 1.796156092E7,
        "ValorFOBCOP": 1.755201962E7,
        "ValorFOBUSD": 7336.39,
        "ViaTransporte": "TRANSPORTE MARITIMO",
        "fila": 2
      }, {
        "Aduana": "BOGOTA",
        "Cantidad": 3,
        "CiudadProveedor": "KWOLOON",
        "CodigoImportador": 8300753577,
        "CodigoPartida": 8711900020,
        "ContinenteCompra": "ASIA",
        "ContinenteOrigen": "ASIA",
        "DepartamentoDestino": "BOGOTA",
        "DepartamentoImportador": "BOGOTA",
        "DescripcionPartidaArancelaria": "Bicicletas con motor elEctrico",
        "FechaAceptacion": "06/01/2015",
        "FletesUSD": 1452.05,
        "NitImportador": 830075357,
        "PaisCompra": "CHINA",
        "PaisExportador": "HONG KONG",
        "PaisProcedencia": "CHINA",
        "Paisorigen": "CHINA",
        "PorcentajeArancel": 15,
        "PorcentajeIVA": 16,
        "RazonSocialImportador": "C I JAPAN S A S",
        "Total": 2438000,
        "TotalArancel": 1095000,
        "TotalIVA": 1343000,
        "Valor CIFUSD": 3051.05,
        "ValorCIFCOP": 7299515083,
        "ValorFOBCOP": 3634146.74,
        "ValorFOBUSD": 1519,
        "ViaTransporte": "TRANSPORTE AEREO",
        "fila": 3
      }, {
        "Aduana": "BUENAVENTURA",
        "Cantidad": 115,
        "CiudadProveedor": "SHENZHEN",
        "CodigoImportador": 9006413468,
        "CodigoPartida": 8711900020,
        "ContinenteCompra": "ASIA",
        "ContinenteOrigen": "ASIA",
        "DepartamentoDestino": "BOGOTA",
        "DepartamentoImportador": "BOGOTA",
        "DescripcionPartidaArancelaria": "Bicicletas con motor elEctrico",
        "FechaAceptacion": "09/01/2015",
        "FletesUSD": 3400,
        "NitImportador": 900641346,
        "PaisCompra": "CHINA",
        "PaisExportador": "CHINA",
        "PaisProcedencia": "CHINA",
        "Paisorigen": "CHINA",
        "PorcentajeArancel": 15,
        "PorcentajeIVA": 16,
        "RazonSocialImportador": "GRUPO GITRONIC SAS",
        "Total": 17239000,
        "TotalArancel": 7742000,
        "TotalIVA": 9497000,
        "Valor CIFUSD": 21572.65,
        "ValorCIFCOP": 5.161170222E7,
        "ValorFOBCOP": 4.23585043E7,
        "ValorFOBUSD": 17705,
        "ViaTransporte": "TRANSPORTE MARITIMO",
        "fila": 4
      }];

      console.log($scope.datosImpo.length);

      var datosMapa = [];
      var cont = 0;

      datos.forEach((item) => {

        if (datosMapa.length === 0
        ) {
          datosMapa.push({nombre: item.PaisExportador, cant: 1})
        }
        else {
          datosMapa.forEach((pais) => {
            console.log(pais.nombre);
            if (item.PaisExportador === pais.nombre) {
              pais.cant = pais.cant + 1;
              cont = 0;
            } else {
              cont = -1;
            }
          })
        }
        if (cont < 0) {
          datosMapa.push({nombre: item.PaisExportador, cant: 1})
        }
      });

      //  console.log(datosMapa);

      var temp = [];
      temp.push(['Country', 'Exportador']);
      datosMapa.forEach((pais) => {
        temp.push([primeraMayuscula((pais.nombre).toLowerCase()), pais.cant])
      });
      console.log(temp);

      function primeraMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      temp.pop();

      google.charts.load('upcoming', {'packages': ['geochart']});
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {

        var data = google.visualization.arrayToDataTable(temp);
        var options = {};
        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        chart.draw(data, options);
      }


    }])
})();
