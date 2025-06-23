const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const productosDisponibles = window.productos || [];;
const lista = document.getElementById('lista-carrito');

  function mostrarCarrito() {
  lista.innerHTML = '';
  if (carrito.length === 0) {
    lista.innerHTML = '<li class="carrito-item">Tu carrito está vacío</li>';
    return;
  }

  carrito.forEach(item => {
    const producto = productosDisponibles.find(p => p._id === item.productoId);
    if (producto) {
      const li = document.createElement('li');
      li.className = 'carrito-item';
      li.innerHTML = `
        <div>
          <strong>${producto.nombre}</strong><br>
          <span>Precio: $${producto.precio}</span><br>
          <span>Cantidad: ${item.cantidad}</span>
        </div>
      `;
      lista.appendChild(li);
    }
  });
}

async function enviarCarrito() {
  if (carrito.length === 0) return alert('El carrito está vacío');
  try {
    const res = await fetch('/api/carrito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carrito)
    });

    if (res.ok) {
      alert('Pedido confirmado');
      vaciarCarrito(); // solo aquí vaciamos
    } else {
      alert('Error al confirmar pedido');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  carrito.length = 0; // limpia el array en memoria
  mostrarCarrito();   // actualiza la vista sin recargar
}


  mostrarCarrito();