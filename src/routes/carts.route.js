import { Router } from "express";
import { CartsModel } from "../../models/carts.model.js";
import { ProductModel } from "../../models/products.model.js";
import { CarritosDao } from "../../models/dao/carritos.dao.js";

const route = Router();
const CarritoService = new CarritosDao(CartsModel);

route.get("/", async (req, res) => {
  try {
    const body = req.body;
    const respuesta = await CarritoService.getAll();
    CarritoService.AddProductToCart("67d2f6e31d213d1fd92e781f", body);
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
  const respuesta = await CarritoService.create(body);
  res.json({ mensaje: "se guardo el producto", payload: respuesta });
});

export default route;
