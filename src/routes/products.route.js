import { Router } from "express";
import fs from "node:fs";

const route = Router();
const filtro = [];
const listaDeProductos = [
  {
    title: "Producto 1",
    description: "Descripción del producto 1",
    code: "P001",
    price: 100,
    status: true,
    stock: 50,
    category: "Electrónica",
    id: "1",
  },
];

const plantilla = {
  title: "",
  description: "",
  code: "",
  price: 0,
  status: true,
  stock: 0,
  category: "",
};
const compararCampos = (nuevoProducto, plantilla) => {
  const plantillaKeys = Object.keys(plantilla);
  const objetoKeys = Object.keys(nuevoProducto);
  for (let key of plantillaKeys) {
    if (!objetoKeys.includes(key)) {
      return false;
    }
  }
  return true;
};
const modificarCampos = (productoModificado, producto) => {
  Object.assign(producto, productoModificado);
};
//GETS
route.get("/", async (req, res) => {
  const query = req.query;
  try {
    const data = await fs.promises.readFile("./productos.json", "utf-8");
    const listaDeProductos = JSON.parse(data);
    if (query.limit) {
      const limit = parseInt(query.limit, 10);
      return res.send(listaDeProductos.slice(0, limit));
    }
    return res.send(listaDeProductos);
  } catch (err) {
    console.error("Error al leer el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});
route.get("/:pid", async (req, res) => {
  const productoId = parseInt(req.params.pid);
  try {
    const data = await fs.promises.readFile("./productos.json", "utf-8");
    const listaDeProductos = JSON.parse(data);
    const producto = listaDeProductos.find(
      (element) => element.id === productoId
    );
    if (producto) {
      return res.send(producto);
    }
    return res.status(404).send("No hay productos con esa ID");
  } catch (err) {
    console.error("Error al leer el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});
//POST
route.post("/", async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  const nuevoProducto = req.body;
  if (
    !nuevoProducto.title ||
    !nuevoProducto.description ||
    !nuevoProducto.code ||
    !nuevoProducto.price ||
    !nuevoProducto.status ||
    !nuevoProducto.stock ||
    !nuevoProducto.category
  ) {
    return res.status(400).json({ mensaje: "Faltan campos requeridos." });
  }

  try {
    const data = await fs.promises.readFile("./productos.json", "utf-8");
    let listaDeProductos = JSON.parse(data);
    const nuevoId =
      listaDeProductos.length > 0
        ? Math.max(...listaDeProductos.map((p) => p.id)) + 1 // Genera un ID numérico incremental
        : 1;
    const productoConId = { ...nuevoProducto, id: nuevoId };
    listaDeProductos.push(productoConId);
    await fs.promises.writeFile(
      "./productos.json",
      JSON.stringify(listaDeProductos, null, 2)
    );
    console.log("Producto agregado:", productoConId);
    return res.status(201).json({
      mensaje: "Producto agregado correctamente.",
      producto: productoConId,
    });
  } catch (err) {
    console.error("Error al leer o escribir el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});

//PUT
route.put("/:pid", async (req, res) => {
  const productoModificado = req.body;
  const productoId = parseInt(req.params.pid);
  try {
    const data = await fs.promises.readFile("./productos.json", "utf-8");
    let listaDeProductos = JSON.parse(data);
    const producto = listaDeProductos.find((prod) => prod.id === productoId);
    if (!producto) {
      return res.status(404).send("Producto no encontrado.");
    }
    if (productoModificado.id) {
      return res.send("Intento de modificación de ID denegado.");
    }
    Object.assign(producto, productoModificado);
    await fs.promises.writeFile(
      "./productos.json",
      JSON.stringify(listaDeProductos, null, 2)
    );
    console.log(listaDeProductos);
    return res.send("Producto modificado exitosamente.");
  } catch (err) {
    console.error("Error al leer o escribir el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});
//DELETE
route.delete("/:pid", async (req, res) => {
  const productoId = parseInt(req.params.pid);
  try {
    const data = await fs.promises.readFile("./productos.json", "utf-8");
    let listaDeProductos = JSON.parse(data);
    const productoAEliminarIndex = listaDeProductos.findIndex(
      (producto) => producto.id === productoId
    );
    if (productoAEliminarIndex !== -1) {
      const productoAEliminar = listaDeProductos.splice(
        productoAEliminarIndex,
        1
      );
      await fs.promises.writeFile(
        "./productos.json",
        JSON.stringify(listaDeProductos, null, 2)
      );
      console.log(listaDeProductos);
      console.log("Producto eliminado:", productoAEliminar);
      return res.send("Producto eliminado exitosamente.");
    } else {
      return res.status(404).send("Producto no encontrado.");
    }
  } catch (err) {
    console.error("Error al leer o escribir el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});
/* FILTRADO POR CATEGORIA(Sin actualizar)
app.get("/products/:pid", (req, res) => {
filtro.splice(0, filtro.length);
listaDeProductos.forEach((elemento) => {
    if (elemento.tipo === req.params.pid) filtro.push(elemento);
});
if (filtro != []) {
    res.send(filtro);
} else {
    res.send("No hay productos con esa categoria");
}
}); */

export default route;
