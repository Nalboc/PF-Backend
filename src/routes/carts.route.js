import { Router } from "express";
import fs from "node:fs";

const route = Router();

route.post("/", async (req, res) => {
  const nuevoCarrito = {
    cID: 1,
    products: [],
  };
  try {
    const data = await fs.promises.readFile("./carrito.json", "utf-8");
    const listaDeCarritos = JSON.parse(data);
    if (listaDeCarritos.length > 0) {
      nuevoCarrito.cID = listaDeCarritos.length + 1;
    }
    listaDeCarritos.push(nuevoCarrito);
    console.log(listaDeCarritos);
    await fs.promises.writeFile(
      "./carrito.json",
      JSON.stringify(listaDeCarritos, null, 2)
    );

    return res.json({
      mensaje: "Carrito creado exitosamente",
      carrito: nuevoCarrito,
    });
  } catch (err) {
    console.error("Error al leer o escribir el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});
route.get("/:cid", async (req, res) => {
  const carritoId = parseInt(req.params.cid);
  try {
    const data = await fs.promises.readFile("./carrito.json", "utf-8");
    const listaDeCarritos = JSON.parse(data);
    const carrito = listaDeCarritos.find((c) => c.cID === carritoId);
    if (!carrito) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }
    return res.json({
      mensaje: "Productos del carrito",
      productos: carrito.products,
    });
  } catch (err) {
    console.error("Error al leer el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});

route.post("/:cid/product/:pid", async (req, res) => {
  const carritoId = parseInt(req.params.cid);
  const productoId = parseInt(req.params.pid);
  try {
    const data = await fs.promises.readFile("./carrito.json", "utf-8");
    const dataProducts = await fs.promises.readFile(
      "./productos.json",
      "utf-8"
    );
    const listaDeCarritos = JSON.parse(data);
    const listaDeProductos = JSON.parse(dataProducts);
    const carrito = listaDeCarritos.find((c) => c.cID === carritoId);
    if (!carrito) {
      return res.send("Carrito no encontrado");
    }
    const producto = listaDeProductos.find((p) => p.id === productoId);
    if (!producto) {
      return res.send("Producto no encontrado");
    }
    const productoExistente = carrito.products.find((p) => p.id === productoId);
    if (productoExistente) {
      if (producto.quantity > 0) {
        productoExistente.quantity += 1;
        producto.quantity -= 1;
        await fs.promises.writeFile(
          "./carrito.json",
          JSON.stringify(listaDeCarritos, null, 2)
        );
        await fs.promises.writeFile(
          "./productos.json",
          JSON.stringify(listaDeProductos, null, 2)
        );
        return res.json({
          mensaje: "Cantidad del producto incrementada",
          carrito,
        });
      } else {
        return res.send("No hay suficiente stock para agregar más productos");
      }
    }
    carrito.products.push({ id: productoId, quantity: 1 });
    await fs.promises.writeFile(
      "./carrito.json",
      JSON.stringify(listaDeCarritos, null, 2)
    );
    await fs.promises.writeFile(
      "./productos.json",
      JSON.stringify(listaDeProductos, null, 2)
    );
    return res.json({
      mensaje: "Producto agregado al carrito",
      carrito,
    });
  } catch (err) {
    console.error("Error al leer el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});

export default route;
