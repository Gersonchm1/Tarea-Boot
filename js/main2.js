const url = 'https://6818a2da5a4b07b9d1d017b1.mockapi.io/actor'
const contenedor = document.querySelector('tbody')
let resultados = ''
let btnCrear = document.getElementById('btnCrear')

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.querySelector('form')
const nombrePersonaje = document.getElementById('nombrePersonaje')
const nombreActor = document.getElementById('nombreActor')
const edadActor = document.getElementById('edadActor')
const poster = document.getElementById('poster')
const fechaNacimiento = document.getElementById('fechaNacimiento')
const productora = document.getElementById('productora')
const trajes = document.getElementById('trajes')
let opcion = ''

btnCrear.addEventListener('click', () => {
    nombrePersonaje.value = ''
    nombreActor.value = ''
    edadActor.value = ''
    ubicacion.value = ''
    poster.value = ''
    fechaNacimiento.value = ''
    productora.value = ''
    trajes.value = ''
    modalArticulo.show()
    opcion = 'crear'
});

const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `
            <tr>
                <td>${articulo.id}</td>
                
                <td>${articulo.NombrePersonaje}</td>
                <td>${articulo.NombreActor}</td>
                <td>${articulo.EdadActor}</td>
                <td>${articulo.Ubicacion}</td>
                <td><img src="${articulo.Poster}" width="50" /></td>
                <td>${articulo.FechaNacimiento}</td>
                <td>${articulo.Productora}</td>
                <td><img src="${articulo.Trajes}" width="50" /></td>
                
                <td class="text-center">
                    <a class="btnEditar btn btn-primary">Editar</a>
                    <a class="btnBorrar btn btn-danger">Borrar</a>
                </td>
            </tr>
        `;
    });
    contenedor.innerHTML = resultados
};

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}
on (document, 'click', '.btnBorrar', e => {
   const fila = e.target.parentNode.parentNode
   const id = fila.firstElementChild.innerHTML
   alertify.confirm("Estas seguro segurisimo de borrar el registro?",
    function(){
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => location.reload())
        
      alertify.success('Ok');
    },
    function(){
      alertify.error('Cancel');
    });
 })
 let idForm = 0
 on (document, 'click', '.btnEditar', e => {
    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombrePersonajeForm = fila.children[1].innerHTML
    const nombreActorForm = fila.children[2].innerHTML
    const edadActorForm = fila.children[3].innerHTML
    const ubicacionForm = fila.children[4].children[0]
    const posterForm = fila.children[5].children[0].src
    const fechaNacimientoForm = fila.children[6].children[0]
    const productoraForm = fila.children[7].children[0]
    const trajesForm = fila.children[8].children[0].src
    nombrePersonaje.value = nombrePersonajeForm
    nombreActor.value = nombreActorForm
    edadActor.value = edadActorForm
    ubicacion.value = ubicacionForm
    poster.value = posterForm
    fechaNacimiento.value = fechaNacimientoForm
    productora.value = productoraForm
    trajes.value = trajesForm
    opcion = 'editar'
    modalArticulo.show()
    
  })
  formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){
        fetch(url,{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                nombrePersonaje: nombrePersonaje.value,
                nombreActor: nombreActor.value,
                edadActor: edadActor.value,
                ubicacion: ubicacion.value,
                poster: poster.value,
                fechaNacimiento: fechaNacimiento.value,
                productora: productora.value,
                trajes: ubicacion.value
                
            })
        })
        .then(response => response.json())
        .then(data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })

    }
    if(opcion=='editar'){
        fetch(`${url}/${idForm}`,{
            method: 'put',
            headers:{
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                nombrePersonaje: nombrePersonaje.value,
                nombreActor: nombreActor.value,
                edadActor: edadActor.value,
                ubicacion: ubicacion.value,
                poster: poster.value,
                fechaNacimiento: fechaNacimiento.value,
                productora: productora.value,
                trajes: ubicacion.value
            })

        })
        .then(response => response.json())
        .then ( response => location.reload())

    }
    modalArticulo.hide()
  })

 