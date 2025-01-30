import fs from "node:fs";

const ListaDeProductos = async (path) => {
  try {
    const data = [];
    await fs.promises.writeFile(path, JSON.stringify(data));
    console.log(data);
  } catch (err) {
    console.log("error=>", err);
  }
};

ListaDeProductos("./carrito.json");

ListaDeProductos("./productos.json");
