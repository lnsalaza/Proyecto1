let amiibos = []

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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

let getEachCategory = (category, name) => {
    let eachCategory = [];
    for (let i = 0; i<amiibos.length;i++){
        switch (category) {
            case 'gameSeries':
                if (amiibos[i].gameSeries == name) {
                    eachCategory.push(amiibos[i]);
                }
                break;
            
            case 'amiiboSeries':
                if (amiibos[i].amiiboSeries == name) {
                    eachCategory.push(amiibos[i]);
                }
                break;

            case 'type':
                if (amiibos[i].type == name) {
                    eachCategory.push(amiibos[i]);
                }
                break;

            case 'character':
                if (amiibos[i].character == name) {
                    eachCategory.push(amiibos[i]);
                }
                break;
            
            default:
                break;
        }
    }
    return eachCategory;
}

/**
 * Se cargan las opciones de gameSeries
 */
let slctSerie = document.getElementById('selectSerieOpt');
let cargarBotonSerie = ()  =>{
    getAmiiboSeries().forEach(element => {
        let newOption = document.createElement('option');
        newOption.value = element;
        newOption.textContent = element;
        slctSerie.appendChild(newOption);
    })
}
slctSerie.addEventListener('change', (event) =>{
    cargandoTabla();
    const id = event.target.value;
    let arreglo = getEachCategory('amiiboSeries', id);
    cargarTablaInfo(arreglo);
})

/**
 * Se cargan las opciones de gameSeries
 */
let slctGame = document.getElementById('selectJuegoOpt');
let cargarBotonGame = ()  =>{
    getGameSeries().forEach(element => {
        let newOption = document.createElement('option');
        newOption.value = element;
        newOption.textContent = element;
        slctGame.appendChild(newOption);
    })
}
slctGame.addEventListener('change', (event) =>{
    cargandoTabla();
    const id = event.target.value;
    let arreglo = getEachCategory('gameSeries', id);
    cargarTablaInfo(arreglo);
})

/**
 * Se cargan las opciones de character
 */
let slctPersonaje = document.getElementById('selectPersonajeOpt');
let cargarBotonPersonaje = ()  =>{
    getCharacters().forEach(element => {
        let newOption = document.createElement('option');
        newOption.value = element;
        newOption.textContent = element;
        slctPersonaje.appendChild(newOption);
    })
}
slctPersonaje.addEventListener('change', (event) =>{
    cargandoTabla();
    const id = event.target.value;
    let arreglo = getEachCategory('character', id);
    cargarTablaInfo(arreglo);
})

/**
 * Se cargan las opciones de type
 */
let slctTipo = document.getElementById('selectTipoOpt');
let cargarBotonTipo = ()  =>{
    getTypes().forEach(element => {
        let newOption = document.createElement('option');
        newOption.value = element;
        newOption.textContent = element;
        slctTipo.appendChild(newOption);
    })
}
slctTipo.addEventListener('change', (event) =>{
    cargandoTabla();
    const id = event.target.value;
    let arreglo = getEachCategory('type', id);
    cargarTablaInfo(arreglo);
})

let cargarFiltros = () => {
    cargarBotonSerie();
    cargarBotonPersonaje();
    cargarBotonGame();
    cargarBotonTipo();
}
 

let cargandoTabla =  (arreglo) =>{
    let contenedor = document.getElementById('amiibosInfo');
    contenedor.innerHTML = 
    `<div class="spinner-border spinner-border-lg text-primary d-flex flex-xxl-fill justify-content-center " role="status" style="margin:50% 250%">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}

let cargarTablaInfo =  (arreglo) =>{
    let contenedor = document.getElementById('amiibosInfo');
    contenedor.innerHTML = ``;



    for (let i = 0; i<arreglo.length;i++){
        if (arreglo[i].type == 'Figure') {
            let plantilla1 = `<tr class="table-primary">
                                <td>
                                <i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>${arreglo[i].amiiboSeries}</strong>
                                </td>
                                <td>${arreglo[i].name}</td>
                                <td>
                                    <ul class="list-unstyled m-0 avatar-group d-flex flex-column justify-content-center">
                                        <li>${arreglo[i].character}<li>
                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="${arreglo[i].name}">
                                            <a href="${arreglo[i].image}" target=”_blank”><img src="${arreglo[i].image}" alt="Avatar" class="rounded-circle" /></a>
                                        </li>
                                    </ul>
                                </td>
                                <td>${arreglo[i].gameSeries}</td>
                                <td><span class="badge bg-label-primary me-1">${arreglo[i].type}</span></td>
                                <td>
                                    <ul class="list-unstyled">
                                        <li>Australia: ${arreglo[i].release.au == null ? "No lanzado": arreglo[i].release.au}</li>
                                        <li>Europa: ${arreglo[i].release.eu == null ? "No lanzado": arreglo[i].release.eu}</li>
                                        <li>Japón: ${arreglo[i].release.jp == null ? "No lanzado": arreglo[i].release.jp}</li>
                                        <li>America: ${arreglo[i].release.na == null ? "No lanzado": arreglo[i].release.na}</li>
                                    </ul>
                                </td>
                            </tr>`;
                contenedor.innerHTML += plantilla1;
        }

        if(arreglo[i].type == 'Band'){
            let plantilla2 = `<tr class="table-success">
                                <td>
                                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>${arreglo[i].amiiboSeries}</strong>
                                </td>
                                <td>${arreglo[i].name}</td>
                                <td>
                                    <ul class="list-unstyled m-0 avatar-group d-flex flex-column justify-content-center">
                                        <li>${arreglo[i].character}<li>
                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="${arreglo[i].name}">
                                            <a href="${arreglo[i].image}" target=”_blank”><img src="${arreglo[i].image}" alt="Avatar" class="rounded-circle" /></a>
                                        </li>
                                    </ul>
                                </td>
                                <td>${arreglo[i].gameSeries}</td>
                                <td><span class="badge bg-label-success me-1">${arreglo[i].type}</span></td>
                                <td>${arreglo[i].release}</td>
                        </tr>`  
            contenedor.innerHTML += plantilla2;
        } 
        
        if (arreglo[i].type == 'Yarn') {
            let plantilla3 = `<tr class="table-warning">
                                <td>
                                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>${arreglo[i].amiiboSeries}</strong>
                                </td>
                                <td>${arreglo[i].name}</td>
                                <td>
                                    <ul class="list-unstyled m-0 avatar-group d-flex flex-column justify-content-center">
                                        <li>${arreglo[i].character}<li>
                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="${arreglo[i].name}">
                                            <a href="${arreglo[i].image}" target=”_blank”><img src="${arreglo[i].image}" alt="Avatar" class="rounded-circle" /></a>
                                        </li>
                                    </ul>
                                    </td>
                                    <td>${arreglo[i].gameSeries}</td>
                                    <td><span class="badge bg-label-warning me-1">${arreglo[i].type}</span></td>
                                    <td>${arreglo[i].release}</td>
                            </tr>`
                contenedor.innerHTML += plantilla3;
        } 
        
        if (arreglo[i].type == 'Card') {
            let plantilla4 = `<tr class="table-info">
                                <td>
                                <i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>${arreglo[i].amiiboSeries}</strong>
                                </td>
                                <td>${arreglo[i].name}</td>
                                <td>
                                    <ul class="list-unstyled m-0 avatar-group d-flex flex-column justify-content-center">
                                        <li>${arreglo[i].character}<li>
                                        <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-xs pull-up" title="${arreglo[i].name}">
                                        <a href="${arreglo[i].image}" target=”_blank”><img src="${arreglo[i].image}" alt="Avatar" class="rounded-circle" /></a>
                                        </li>
                                    </ul>
                                </td>
                                <td>${arreglo[i].gameSeries}</td>
                                <td><span class="badge bg-label-info me-1">${arreglo[i].type}</span></td>
                                <td>${arreglo[i].release}</td>
                            </tr>`
            contenedor.innerHTML += plantilla4;
        }
    }
    
}


window.onload = async () =>{
    cargarDatos();
    cargandoTabla();
    await esperar(3000);
    cargarFiltros();
    cargarTablaInfo(amiibos);
}


