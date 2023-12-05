const carrito = document.getElementById("carrito");
const zapatillas = document.getElementById("lista-zapatillas");
const listaZapatillas = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners(){
    zapatillas.addEventListener("click", comprarZapatilla);
    carrito.addEventListener("click", eliminarZapatilla);
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    document.addEventListener("DOMContentLoaded", leerLocalStorage)
}

function comprarZapatilla(e){
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const zapatilla = e.target.parentElement.parentElement;
        leerDatosZapatilla(zapatilla);
    }
}

function leerDatosZapatilla(zapatillas){
    const infoZapatillas = {
        imagen: zapatillas.querySelector("img").src,
        titulo: zapatillas.querySelector("h4").textContent,
        precio: zapatillas.querySelector(".precio span").textContent,
        id: zapatillas.querySelector("a").getAttribute("date-id")
    }
    insertarCarrito(infoZapatillas);
}

function insertarCarrito(zapatilla){
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${zapatilla.imagen}" width="100">
        </td>
        <td>${zapatilla.titulo}</td>
        <td>${zapatilla.precio}</td>
        <td>
            <a href="#" class="borrar-zapatilla" data-id="${zapatilla.id}">X</a>
        </td>
    `;
    listaZapatillas.appendChild(row);
    guardarZapatillaLocalStorage(zapatilla);
}


function eliminarZapatilla(e){
    e.preventDefault();

    let zapatilla,
    zapatillaId;
    if(e.target.classList.contains("borrar-zapatilla")){
        e.target.parentElement.parentElement.remove();
        zapatilla = e.target.parentElement.parentElement;
        zapatillaId = zapatilla.querySelector("a").getAttribute("data-id");
    }
    eliminarZapatillaLocalStorage(zapatillaId);
}

function vaciarCarrito(){
    while(listaZapatillas.firstChild){
        listaZapatillas.removeChild(listaZapatillas.firstChild);
    }
    vaciarLocalStorage();
    return false;
}

function guardarZapatillaLocalStorage(zapatilla){
    let zapatillas;
    zapatillas = obtenerZapatillasLocalStorage();
    zapatillas.push(zapatilla);
    localStorage.setItem("zapatillas", JSON.stringify(zapatillas))
}

function obtenerZapatillasLocalStorage() {
    let zapatillasLS;

    if(localStorage.getItem("zapatillas") === null){
        zapatillasLS = [];
    }else{
        zapatillasLS = JSON.parse(localStorage.getItem("zapatillas"));
    }
    return zapatillasLS;
}

function leerLocalStorage(){
    let zapatillasLS;

    zapatillasLS = obtenerZapatillasLocalStorage();

    zapatillasLS.forEach(function(zapatilla){
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${zapatilla.imagen}" width="100">
            </td>
            <td>${zapatilla.titulo}</td>
            <td>${zapatilla.precio}</td>
            <td>
                <a href="#" class="borar-zapatilla" data-id="${zapatilla.id}">X</a>
            </td>
        `;
        listaZapatillas.appendChild(row);
    });
}

function eliminarZapatillaLocalStorage(zapatilla) {
    let zapatillasLS;

    zapatillasLS = obtenerZapatillasLocalStorage();

    zapatillasLS.forEach(function(zapatillasLS, index){
        if(zapatillasLS.id === zapatilla ){
            zapatillasLS.splice(index, 1)
        }
    });
    localStorage.setItem("zapatillas", JSON.stringify(zapatillasLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}


