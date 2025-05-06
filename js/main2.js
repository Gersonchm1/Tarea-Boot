const url = 'https://6818a2da5a4b07b9d1d017b1.mockapi.io/actor'
const contenedor = document.querySelector('tbody')
let resultados = ''
let btnCrear = document.getElementById('btnCrear')

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.querySelector('form')
const nombre = document.getElementById('nombre')
const edad = document.getElementById('edad')
const trabajo = document.getElementById('trabajo')
const avatar = document.getElementById('avatar')
let opcion = ''

btnCrear.addEventListener('click', () => {
    nombre.value = ''
    edad.value = ''
    trabajo.value = ''
    avatar.value = ''
    modalArticulo.show()
    opcion = 'crear'
});

const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `
            <tr>
                <td>${articulo.id}</td>
                <td>${articulo.name}</td>
                <td>${articulo.age}</td>
                <td>${articulo.jod}</td>
                <td><img src="${articulo.avatar}" width="50" /></td>
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
    const nombreForm = fila.children[1].innerHTML
    const edadForm = fila.children[2].innerHTML
    const trabajoForm = fila.children[3].innerHTML
    const avatarForm = fila.children[4].children[0].src
    nombre.value = nombreForm
    edad.value = edadForm
    trabajo.value = trabajoForm
    avatar.value = avatarForm
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
                name: nombre.value,
                age: edad.value,
                jod: trabajo.value,
                avatar: avatar.value
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
                name: nombre.value,
                age: edad.value,
                jod: trabajo.value,
                avatar: avatar.value
            })

        })
        .then(response => response.json())
        .then ( response => location.reload())

    }
    modalArticulo.hide()
  })

 