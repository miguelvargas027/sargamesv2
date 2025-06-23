let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id, nombre) {
  const index = carrito.findIndex(p => p.productoId === id);
  if (index >= 0) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ productoId: id, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} agregado al carrito.`);
}