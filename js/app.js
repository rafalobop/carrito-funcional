const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = [];

cargarEventListeners()

function cargarEventListeners() {
    //cuando agregas un curso presionar "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso)

    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        vaciarCarrito()
    })
};





//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {

        const curso = e.target.parentElement.parentElement
        leerDatosCurso(curso)
    }
}

//eliminar un curso
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.getAttribute('data-id')
        //elimina del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        console.log(articulosCarrito)
        carritoHTML()
    }
}


function leerDatosCurso(curso) {
    console.log(curso);

    //crear objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //si ya existe, 
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //actualizamos
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //agrego elemento
        articulosCarrito = [...articulosCarrito, infoCurso]
    };


    //agrega elementos al carrito
    articulosCarrito = [...articulosCarrito];
    console.log(articulosCarrito)

    carritoHTML()
}

//muestra los articulos del carrito
function carritoHTML() {

    //limpiar el html
    vaciarCarrito();

    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `

        //agrega contenedor al tbody
        contenedorCarrito.appendChild(row)
    })
}
//elimina los cursos del tbody
function vaciarCarrito() {
    //forma lenta
    // contenedorCarrito.innerHTML = ""

    //forma optimizada
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};