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
    const body = req.body;
    const respuesta = await CarritoService.getAll();
    /* CarritoService.AddProductToCart("67d2f6e31d213d1fd92e781f", body); */
    res.json({
      mensaje: "peticion get llamado correctamente",
      payload: respuesta,
    });
  } catch (e) {
    return res.status(500).json({ mensaje: "error al guardar producto" });
  }
});
route.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const respuesta = await CarritoService.getById(cid);
    /* CarritoService.AddProductToCart("67d2f6e31d213d1fd92e781f", body); */
    res.json({
      mensaje: "peticion get llamado correctamente",
      payload: respuesta,
    });
  } catch (e) {
    return res.status(500).json({ mensaje: "error al guardar producto" });
  }
});
route.post("/", async (req, res) => {
  const body = req.body;
  const respuesta = await CarritoService.crear(body);
  res.json({ mensaje: "se guardo el producto", payload: respuesta });
});
route.put("/:Cid/:Pid", async (req, res) => {
  const carritoId = req.params.Cid;
  const productoId = req.params.Pid;
  const producto = await ProductService.getById(productoId);
  const carrito = await CarritoService.getById(carritoId);
  if (producto) {
    console.log("producto encontrado");
    console.log(producto);
    carrito.products.push[producto.title];
    /* const productsList = { products: [{ title: producto.title }] };
    const respuesta = await CarritoService.update(carritoId, productsList); */
    res.json({ mensaje: "se guardo el producto", payload: carrito });
  } else {
    res.json({ mensaje: "ese producto no existe" });
  }
});

route.put("/:cid/asignar/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const carrito = await CarritoService.getById(cid);
  carrito.products.push({ productoID: pid });
  const carritoActualizado = await CarritoService.update({ _id: cid }, carrito);
  res.json({ mensaje: "producto agregado", payload: carritoActualizado });
});
export default route;
