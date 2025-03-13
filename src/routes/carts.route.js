import { Router } from "express";
import { CartsModel } from "../../models/carts.model.js";
import { ProductModel } from "../../models/products.model.js";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const respuesta = await CartsModel.find();
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
  const respuesta = await CartsModel.create(body);
  res.json({ mensaje: "se guardo el producto", payload: respuesta });
});

export default route;
