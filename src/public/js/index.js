const socketClient = io();
socketClient.on("data", (productos) => {
  const listaProductos = document.querySelector(".productsList");
  listaProductos.innerHTML = "";
  productos.forEach((producto) => {
    const p = document.createElement("p");
    p.textContent = `ID: ${producto.id} - Nombre: ${producto.title} - Precio: ${producto.price}`;
    listaProductos.appendChild(p);
  });
});
