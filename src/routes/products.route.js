import { Router } from "express";
import { ProductModel } from "../../models/products.model.js";
import { ProductosDao } from "../../models/dao/productos.dao.js";

const route = Router();
const ProductosService = new ProductosDao(ProductModel);

route.get("/", async (req, res) => {
  try {
    const respuesta = await ProductosService.getAll();
    if (!respuesta)
      return res
        .status(500)
        .json({ mensaje: "error en la consulta a la base de datos" });
    res.json({
      mensaje: "peticion get llamado correctamente",
      payload: respuesta,
    });
  } catch (e) {
    return res.status(500).json({ mensaje: "error al guardar producto" });
  }
});
route.get("/:pid", async (req, res) => {
  const id = await req.params;
  const respuesta = await ProductosService.getById(id.pid);
  if (!respuesta)
    return res
      .status(500)
      .json({ mensaje: "error en la consulta a la base de datos" });
  res.json({
    mensaje: "peticion get by id llamado correctamente",
    payload: respuesta,
  });
});
route.post("/", async (req, res) => {
  const body = req.body;
  const respuesta = await ProductosService(body);
  if (!respuesta)
    return res
      .status(500)
      .json({ mensaje: "error en la consulta a la base de datos" });
  res.json({ mensaje: "se guardo el producto", payload: respuesta });
});
route.put("/:pid", async (req, res) => {
  const body = req.body;
  console.log(body);
  const id = req.params;
  const resultado = await ProductosService.update(id.pid, body);
  if (!respuesta)
    return res
      .status(500)
      .json({ mensaje: "error en la consulta a la base de datos" });
  res
    .status(200)
    .json({ mensaje: "se actualizo un producto", payload: resultado });
});
route.delete("/:pid", async (req, res) => {
  const id = req.params;
  const resultado = await ProductosService.delete(id);
  if (!respuesta)
    return res
      .status(500)
      .json({ mensaje: "error en la consulta a la base de datos" });
  res
    .status(200)
    .json({ mensaje: "se elimino un producto", payload: resultado });
});

export default route;
