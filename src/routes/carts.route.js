import { Router } from "express";
import { CartsModel } from "../../models/carts.model.js";
import { ProductModel } from "../../models/products.model.js";
import { CarritosDao } from "../../models/dao/carritos.dao.js";
import { ProductosDao } from "../../models/dao/productos.dao.js";

const route = Router();
const CarritoService = new CarritosDao(CartsModel);
const ProductService = new ProductosDao(ProductModel);

route.get("/", async (req, res) => {
  try {
    const respuesta = await CarritoService.getCarritos();
    res.json({
      mensaje: "peticion get llamado correctamente",
      payload: respuesta,
    });
  } catch (e) {
    return res.status(500).json({ mensaje: "error al llamado get" });
  }
});
route.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const respuesta = await CarritoService.getById(cid);
    res.json({
      mensaje: "peticion getbyid llamado correctamente",
      payload: respuesta,
    });
  } catch (e) {
    return res.status(500).json({ mensaje: "error al llamado getbyid" });
  }
});
route.post("/", async (req, res) => {
  try {
    const body = req.body;
    const respuesta = await CarritoService.crear(body);
    res.json({ mensaje: "se guardo el carrito vacio", payload: respuesta });
  } catch (e) {
    return res.status(500).json({ mensaje: "error al crear el carrito" });
  }
});
route.put("/:cid/asignar/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const carrito = await CarritoService.getById(cid);
  carrito.products.push({ productoID: pid });
  const carritoActualizado = await CarritoService.update({ _id: cid }, carrito);
  res.json({ mensaje: "producto agregado", payload: carritoActualizado });
});
route.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const resultado = await CarritoService.delete(cid);
  if (!resultado)
    return res
      .status(500)
      .json({ mensaje: "error en la consulta a la base de datos" });
  res
    .status(200)
    .json({ mensaje: "se elimino un producto", payload: resultado });
});
route.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const carrito = await CarritoService.getById(cid);
    if (!carrito) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    const productId = carrito.products.findIndex(
      (product) => product.productoID.toString() === pid
    );
    if (productId === -1) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }
    carrito.products.splice(productId, 1);
    const carritoActualizado = await CarritoService.update(cid, carrito, {
      new: true,
    });
    res.status(200).json({
      message: "Producto eliminado correctamente",
      carritoActualizado,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al eliminar el producto del carrito" });
  }
});
export default route;
