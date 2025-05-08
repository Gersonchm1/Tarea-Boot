let link = `https://6818a2da5a4b07b9d1d017b1.mockapi.io/actor`
function api(){
    axios.get(link)
    .then((response)=>{
        console.log(response["data"])
    })
}
function añadir(NombrePersonaje,NombreActor,EdadActor,Ubicacion,Poster,FechaNacimiento,Productora,Trajes){
    axios.post(link,{
        "NombrePersonaje":NombrePersonaje,
        "NombreActor":NombreActor,
        "EdadActor":EdadActor,
        "Ubicacion":Ubicacion,
        "Poster":Poster,
        "FechaNacimiento":FechaNacimiento,
        "Productora":Productora,
        "Trajes":Trajes
 
    })
}
api()
document.getElementById("Guardar").addEventListener("click", function(e){
    e.preventDefault();

    let NombrePersonaje = document.getElementById("nombrePersonaje").value
    let NombreActor = document.getElementById("nombreActor").value
    let EdadActor = document.getElementById("edadActor").value
    let Ubicacion = document.getElementById("ubicacion").value
    let Poster = document.getElementById("poster").value
    let FechaNacimiento = document.getElementById("fechaNacimiento").value
    let Productora = document.getElementById("productora").value
    let Trajes = document.getElementById("N/n").value

    añadir(NombrePersonaje,NombreActor,EdadActor,Ubicacion,Poster,FechaNacimiento,Productora,Trajes)
})