document.getElementById('form-crear').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const res = await fetch('/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) location.reload();
});

async function eliminarProducto(id) {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    if (res.ok) location.reload();
  }
}

async function editarProducto(id) {
  const nombre = prompt('Nuevo nombre:');
  const descripcion = prompt('Nueva descripción:');
  const precio = prompt('Nuevo precio:');
  const stock = prompt('Nuevo stock:');
  if (nombre && descripcion && precio && stock) {
    const res = await fetch(`/api/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, descripcion, precio, stock })
    });
    if (res.ok) location.reload();
  }
}
