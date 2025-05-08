async function agregarHeroe(hero) {
    try {
        
        const response = await fetch('https://6818a2da5a4b07b9d1d017b1.mockapi.io/actor', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hero), 
        });

        if (!response.ok) {
            throw new Error('Error al agregar el superhéroe');
        }

        const heroAdded = await response.json();
        mostrarHeroes(heroAdded);
        alert('Superhéroe agregado exitosamente');

    } catch (error) {
        console.error('Error al agregar el héroe:', error);
        alert('Hubo un error al agregar el superhéroe');
    }
}
document.getElementById('hero-form').addEventListener('submit',function(event){
    event.preventDefault();
    const nombrePersonaje =document.getElementById('nombrePersonaje').value;
    const nombreActor =document.getElementById('nombreActor').value;
    const edadActor =document.getElementById('edadActor').value;
    const ubicacion =document.getElementById('ubicacion').value;
    const poster =document.getElementById('poster').value;
    const fechaNacimiento =document.getElementById('fechaNacimiento').value;
    const productora =document.getElementById('productora').value;
    
    const nuevoHeroe={
        NombrePersonaje: nombrePersonaje,
        NombreActor: nombreActor,
        EdadActor: edadActor,
        Ubicacion: ubicacion,
        Poster: poster,
        AñoNacimiento: fechaNacimiento,
        Productora: productora,
       

    };
    agregarHeroe(nuevoHeroe);
    document.getElementById('hero-form').reset();
    


});
