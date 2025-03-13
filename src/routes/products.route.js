import { Router } from "express";
import { ProductModel } from "../../models/products.model.js";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const respuesta = await ProductModel.find();
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
  const respuesta = await ProductModel.findById(id.pid);
  res.json({
    mensaje: "peticion get by id llamado correctamente",
    payload: respuesta,
  });
});
route.post("/", async (req, res) => {
  const body = req.body;
  const respuesta = await ProductModel.create(body);
  res.json({ mensaje: "se guardo el producto", payload: respuesta });
});
route.put("/:pid", async (req, res) => {
  const body = req.body;
  console.log(body);
  const id = req.params;
  const result = await ProductModel.findByIdAndUpdate(id.pid, body, {
    new: true,
  });
  res
    .status(200)
    .json({ mensaje: "se actualizo un producto", payload: result });
});
route.delete("/:pid", async (req, res) => {
  const id = req.params;
  const result = await ProductModel.deleteOne({ _id: id.pid });
  res.status(200).json({ mensaje: "se elimino un producto", payload: result });
});

export default route;
