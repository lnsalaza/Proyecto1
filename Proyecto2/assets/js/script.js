let amiibos = []
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let cardColor, headingColor, axisColor, shadeColor, borderColor;

  cardColor = config.colors.white;
  headingColor = config.colors.headingColor;
  axisColor = config.colors.axisColor;
  borderColor = config.colors.borderColor;

const cargarDatos = async () => {
    try {
        let response = await fetch('https://amiiboapi.com/api/amiibo/');
        let data = await response.json();
        for (let amiibo of data.amiibo){
            let amii = {
                amiiboSeries: amiibo.amiiboSeries,
                character: amiibo.character,
                gameSeries: amiibo.gameSeries,
                head: amiibo.head,
                image: amiibo.image,
                name: amiibo.name,
                release: amiibo.release,
                tail: amiibo.tail,
                type: amiibo.type
            }
            amiibos.push(amii)
        }
        console.log(amiibos)
    } catch (err) {
        console.error()
    }
}

let getAmiiboSeries = () =>{
    let amiiboSeries = new Set();
    for (let i = 0; i<amiibos.length;i++){
        amiiboSeries.add(amiibos[i].amiiboSeries);
    }
    return amiiboSeries;
}

let getCharacters = () =>{
    let characters = new Set();
    for (let i = 0; i<amiibos.length;i++){
        characters.add(amiibos[i].character);
    }
    return characters;
}

let getGameSeries = () =>{
    let gameSeries = new Set();
    for (let i = 0; i<amiibos.length;i++){
        gameSeries.add(amiibos[i].gameSeries);
    }
    return gameSeries;
}

let getTypes = () =>{
    let types = new Set()
    for (let i = 0; i<amiibos.length;i++){
        types.add(amiibos[i].type);
    }
    return types
}

let getReleases = () =>{
    let au,eu,jp,na  = []
    for (let i = 0; i<amiibos.length;i++){
        types.add(amiibos[i].type);
    }
    return releases
}

let cargarCantidadPorAmiiboSeries = () => {
    var options1 = {
        series: [],
        chart: {
        height: 500,
        type: 'pie',
      },
      theme:{
        palette: 'pallete5'
      },
      plotOptions: {
        radialBar: {
            hollow: {
                margin: 5,
                size: '0%',
                background: 'transparent',
                image: undefined,
            },
            dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            }
          }
        }
      },
      labels: [],
      responsive: [
        {
            breakpoint: 580,
            options: {
                chart: {
                    height: '300',
                },
                legend:{
                    show:false
                }
            }
        }
      ]
    };

    getAmiiboSeries().forEach(element => {
        let count = 0;
        for (let i = 0; i<amiibos.length;i++){
            if(amiibos[i].amiiboSeries == element){
                count++;
            }
        }
        options1.labels.push(element)
        options1.series.push(count);
    });

    var chartAmiiboSeries1 = new ApexCharts(document.querySelector("#AmiiboSeriesChart1"), options1);
    chartAmiiboSeries1.render();
}

let cargarCantidadPorGameSeries = ()=>{
    var options = {
        chart: {
            id:'gameSeries',
            type: 'bar',
            height: 350 
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 12,
            distributed: true,
          }
        },labels: {
            show:false
          },
        series: [{
            data: []
        }],
        theme:{
            palette: 'palette5'
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        
        xaxis: {
          labels: {show:false},
          axisTicks: {show: false },
          axisBorder: {show: false}
        },
        toolbar:{
            show:false
        },
        responsive: [
            {
                breakpoint: 580,
                options: {
                    chart: {
                        height: 800, 
                        columnWidth: '32%'
                    },
                    plotOptions: {
                        bar: {
                          horizontal: true,
                          columnHeight:50,
                          borderRadius:10
                        }
                    },
                    yaxis: {
                      labels: {show:false},
                      axisTicks: {show: false },
                      axisBorder: {show: false}
                    }
                }
            }
        ]
    }

    getGameSeries().forEach(element => {
        if(element != 'Animal Crossing' && element != 'Mario Sports Superstars' && element != 'Super Mario'){
            let gameS = {
            x:element,
            y:0
            }
            let count = 0;
            for (let i = 0; i<amiibos.length;i++){
                if(amiibos[i].gameSeries == element){
                    count++;
                }
            }
            gameS.y = count;
            options.series[0].data.push(gameS)
        }
    });

    let datos = document.getElementById('GameSeriesChart')
    var chart1 = new ApexCharts(datos, options);
    chart1.render();

    
}

let cargarTop3 = () => {
    var optionsTop3 = {
        chart: {
            id: 'top3',
            type: 'bar',
            height: 200,
            width: 500
        },
        plotOptions: {
          bar: {
            distributed: true,
            horizontal: false,
            borderRadius: 12,
          }
        },
        legend: {
          show: false
        },
        series: [{
            data: []
        }],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          labels: {show:false},
          axisTicks: {show: false },
          axisBorder: {show: false}
        },
        theme:{
            palette: 'palette7'
        },
        toolbar:{
            show:false
        },
        responsive: [
            {
                breakpoint: 580,
                options: {
                    chart: {
                        height: 200,
                        width: 300
                    }
                }
            }
        ]
    }

    getGameSeries().forEach(element => {
        if(element == 'Animal Crossing' || element == 'Mario Sports Superstars' || element == 'Super Mario'){
            let gameS = {
            x:element,
            y:0
            }
            let count = 0;
            for (let i = 0; i<amiibos.length;i++){
                if(amiibos[i].gameSeries == element){
                    count++;
                }
            }
            gameS.y = count;
            optionsTop3.series[0].data.push(gameS)
        }
    });

    let datosTop3 = document.getElementById('GameSeriesChartTop3')
    var chart = new ApexCharts(datosTop3, optionsTop3);
    chart.render();

}


let slctGame = document.getElementById('selectGameOpt');
let cargarBotonGame = ()  =>{
    getGameSeries().forEach(element => {
        let newOption = document.createElement('option');
        newOption.value = element;
        newOption.textContent = element;
        slctGame.appendChild(newOption);
    })
}
slctGame.addEventListener('change', (event) =>{
    const id = event.target.value;
    arregloDePersonajes(id);
})

let arregloDePersonajes = (categoria) => {
    let data = []
    let colors = []
    getCharacters().forEach(element => {
        colors.push(generadorDeColores());
        let gameS = {
            x:element,
            y:0
        }
        let count = 0;
        for (let i = 0; i<amiibos.length;i++){
            if(amiibos[i].character == element && amiibos[i].gameSeries == categoria){
                count++;
            }
        }
        gameS.y = count;
        data.push(gameS)
    });
    ApexCharts.exec('chartPersonajes', 'updateOptions',{ series:[{data: data}]});
}

let cargarCantidadPorPersonaje = () => {
    var options = {
        series: [
        {
          data: [{
            x: 'Personajes',
            y: getCharacters().size
          }]
        }
        ],
            legend: {
            show: false
        },
        themes:{
            palette: 'palette5'
        },
        chart: {
            id: 'chartPersonajes',
            height: 350,
            type: 'treemap',
            toolbar: { show: false}
        },
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
            borderRadius:5
          }
        }
    };

    var chartPersonajes = new ApexCharts(document.querySelector("#totalCharacterChart"), options);
    chartPersonajes.render();
}

let generadorDeColores = () => {
    var color = "#" + Math.random().toString(16).slice(-3);
    return color;
}

let cargarLanzamientosPorRegion = () =>{
  const totalRevenueChartEl = document.querySelector('#totalReleaseChart'),
    totalRevenueChartOptions = {
      series: [
        {
          name: 'Australia',
          data: [0,0,0,0,0,0,0,0,0]
        },
        {
          name: 'Europa',
          data: [0,0,0,0,0,0,0,0,0]
        },
        {
          name: 'Japón',
          data: [0,0,0,0,0,0,0,0,0]
        },
        {
          name: 'América',
          data: [0,0,0,0,0,0,0,0,0]
        }
      ],
      chart: {
        height: 300,
        stacked: true,
        type: 'line',
        toolbar: { show: false}
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '33%',
          borderRadius: 12,
          startingShape: 'rounded',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 6,
        lineCap: 'round',
        colors: [config.colors.primary, config.colors.info, config.colors.success, config.colors.warning]
      },
      legend: {
        show: true,
        horizontalAlign: 'left',
        position: 'top',
        markers: {
          height: 8,
          width: 8,
          radius: 12,
          offsetX: -3
        },
        labels: {
          colors: axisColor
        },
        itemMargin: {
          horizontal: 10
        }
      },
      grid: {
        padding: {
          top: 0,
          bottom: -8,
          left: 20,
          right: 20
        }
      },
      xaxis: {
        categories: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        labels: {
          style: {
            fontSize: '13px',
            colors: axisColor
          }
        },
        axisTicks: {show: false },
        axisBorder: {show: false}
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '13px',
            colors: axisColor
          }
        }
      },
      states: {
        hover: {filter: {type: 'none'}},
        active: {filter: {type: 'none'}}
      }
    };
    for (let i = 0; i<amiibos.length; i++){

        if(amiibos[i].release.au != null){
            for (let j = 0; j<totalRevenueChartOptions.xaxis.categories.length; j++){
                let año = totalRevenueChartOptions.xaxis.categories[j];
                amiibos[i].release.au.includes(año) ? totalRevenueChartOptions.series[0].data[j] +=1:totalRevenueChartOptions.series[0].data[0] +=0

            }
        }

        if(amiibos[i].release.eu != null){
            for (let j = 0; j<totalRevenueChartOptions.xaxis.categories.length; j++){
                let año = totalRevenueChartOptions.xaxis.categories[j];
                amiibos[i].release.eu.includes(año) ? totalRevenueChartOptions.series[1].data[j] +=1:totalRevenueChartOptions.series[0].data[0] +=0
            }        
        }

        if(amiibos[i].release.jp != null){
            for (let j = 0; j<totalRevenueChartOptions.xaxis.categories.length; j++){
                let año = totalRevenueChartOptions.xaxis.categories[j];
                amiibos[i].release.jp.includes(año) ? totalRevenueChartOptions.series[2].data[j] +=1:totalRevenueChartOptions.series[0].data[0] +=0
            }       
        }  

        if(amiibos[i].release.na != null){
            for (let j = 0; j<totalRevenueChartOptions.xaxis.categories.length; j++){
                let año = totalRevenueChartOptions.xaxis.categories[j];
                amiibos[i].release.na.includes(año) ? totalRevenueChartOptions.series[3].data[j] +=1:totalRevenueChartOptions.series[0].data[0] +=0
            }
        }


    }

  if (typeof totalRevenueChartEl !== undefined && totalRevenueChartEl !== null) {
    const totalRevenueChart = new ApexCharts(totalRevenueChartEl, totalRevenueChartOptions);
    totalRevenueChart.render();
  }
    
}

let cargarTipos = () => {
    const chartOrderStatistics = document.querySelector('#orderTypeChart'),
    orderChartConfig = {
      chart: {
        height: 165,
        width: 130,
        type: 'donut'
      },
      labels: [],
      series: [],
      colors: [config.colors.primary, config.colors.secondary, config.colors.info, config.colors.success],
      stroke: {
        width: 5,
        colors: cardColor
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
            val
          return parseInt((val*100)/amiibos.length) + '%';
        }
      },
      legend: {
        show: false
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          right: 15
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%',
            labels: {
              show: true,
              value: {
                fontSize: '1.5rem',
                fontFamily: 'Public Sans',
                color: headingColor,
                offsetY: -15,
                formatter: function (val) {
                  return parseInt((val*100)/amiibos.length) + '%';
                }
              },
              name: {
                offsetY: 20,
                fontFamily: 'Public Sans'
              },
              total: {
                show: true,
                fontSize: '0.8125rem',
                color: axisColor,
                label: 'Tipos',
                formatter: function (w) {
                  return '100%';
                }
              }
            }
          }
        }
      }
    };

    getTypes().forEach(element => {
        orderChartConfig.labels.push(element)
        let count = 0;
        let cantidad = document.getElementById(element)
        for (let i = 0; i<amiibos.length;i++){
            if(amiibos[i].type == element){
                count++;
            }
        }   
        cantidad.textContent = count;
        orderChartConfig.series.push(count)
    });

    let aTotal = document.getElementById('aTotal').textContent = amiibos.length;

  if (typeof chartOrderStatistics !== undefined && chartOrderStatistics !== null) {
    const statisticsChart = new ApexCharts(chartOrderStatistics, orderChartConfig);
    statisticsChart.render();
  }
}

let cargarTotalAmiiboAndGameSeries = () => {
    let container1 = document.getElementById('tAmiiboSeries')
    let container2 = document.getElementById('tGameSeries')
    container1.textContent = getAmiiboSeries().size
    container2.textContent = getGameSeries().size
}

let cargarCharts = () => {
    cargarBotonGame();
    cargarCantidadPorPersonaje();
    cargarCantidadPorGameSeries();
    cargarTop3();
    cargarCantidadPorAmiiboSeries();
    cargarTipos();
    cargarLanzamientosPorRegion();
    cargarTotalAmiiboAndGameSeries();
}

document.addEventListener('DOMContentLoaded',async (event) =>{
    cargarDatos();
    await esperar(2000);
    cargarCharts();
} )


