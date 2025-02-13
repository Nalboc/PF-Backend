import { Router } from "express";
import fs from "node:fs";

const route = Router();

route.get("/", async (req, res) => {
  try {
    const data = await fs.promises.readFile("./productos.json", "utf-8");
    const productos = data;
    res.render("home", { productos });
  } catch (err) {
    console.error("Error al leer el archivo:", err);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
});
route.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", {});
});
export default route;
