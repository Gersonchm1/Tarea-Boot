const nuevoHeroeBtn = document.getElementById('nuevoHeroeBtn');
  const registroTrajes = document.getElementById('registroTrajes');
  const btnAgregarTraje = document.getElementById('btnAgregarTraje');
  const contenedorTrajes = document.getElementById('contenedor-trajes gap-2');
  
  nuevoHeroeBtn.addEventListener('click',()=>{
    registroTrajes.classList.remove('d-none')
  });
  

  
  
  function crearCampoTraje() {
    const div = document.createElement('div');
    div.classList.add('input-group', 'mb-2');
    
    div.innerHTML = `
      <div class="d-flex align-items-center gap-2 mb-3">
        <input type="text" class="form-control" name="traje[]" placeholder="Nombre traje">
        <button type="button" class="btn btn-danger" onclick="eliminarCampo(this)">-</button>
      </div>
    `;
  
    contenedorTrajes.appendChild(div);
  }
  
  
  // Función para eliminar el campo
  function eliminarCampo(boton) {
    // Seleccionar el contenedor más cercano que envuelve el input y el botón
    const div = boton.closest('.input-group');
    contenedorTrajes.removeChild(div);
  }

  // Agregar nuevo campo al dar clic en "+"
  btnAgregarTraje.addEventListener('click', crearCampoTraje);
  document.getElementById('mostrarHeroesBtn').addEventListener('click', function(event) {
    // Evitar el comportamiento por defecto del botón (enviar formulario si es parte de uno)
    event.preventDefault();
    
    // Redirigir a index3.html
    window.location.href = 'index3.html';
  });
