let amiibos = []

let names = new Set();

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

let cargarCantidadPorGameSeries = ()=>{
    var options = {
        chart: {
            type: 'bar'
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        theme: {
            palette: 'palette3' // upto palette10
        },
        series: [{
            data: []
        }]
    }
    getGameSeries().forEach(element => {
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
        
        console.log(options.series[0].data)
    });
    let datos = document.getElementById('data')
    var chart = new ApexCharts(datos, options);
    chart.render();
}

let cargarCantidadPorTipoDonut = ()=>{
    var options = {
        chart: {
            type: 'donut'
        },
        series: [],
        labels: []
    }

    getTypes().forEach(element => {
        options.labels.push(element)
        let count = 0;
        for (let i = 0; i<amiibos.length;i++){
            if(amiibos[i].type == element){
                count++;
            }
        }   
        options.series.push(count)
    });

    let datos = document.getElementById('data')
    var chart = new ApexCharts(datos, options);
    chart.render();
}

let cargarTablaInfo = (arreglo) =>{
    let arreglo1 = arreglo
    
}

document.addEventListener('DOMContentLoaded',cargarDatos())


let boton = document.getElementById('amiibo')
boton.addEventListener('click',event =>{
    //getAmiiboSeries();
    // let p = document.getElementById('data')
    // let a  = getTypes()
    // p.innerHTML = `<p>${a[0]}</p>`
    //console.log(getGameSeries())
    cargarCantidadPorTipoDonut()
    //cargarCantidadPorGameSeries()
    //console.log(getTypes())
})
