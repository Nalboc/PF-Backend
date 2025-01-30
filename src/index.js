import express from "express";
import productsRoute from "./routes/products.route.js";
import cartRoute from "./routes/carts.route.js";

const app = express();
app.use(express.json());
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);

app.listen(8080, () => {
  console.log("SERVIDOR LISTO EN PUERTO 8080");
});
app.get("/", (req, res) => {
  return res.send("Bienvenido");
});
