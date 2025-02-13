import express from "express";
import handlebars from "express-handlebars";
import { _dirname } from "./utils.js";
import { Server } from "socket.io";
import vistaRouter from "./routes/vista.route.js";
import productsRoute from "./routes/products.route.js";
import cartRoute from "./routes/carts.route.js";
import fs from "node:fs";

const app = express();
const serverHttp = app.listen(8080, () => {
  console.log("SERVIDOR LISTO EN PUERTO 8080");
});
const socketServer = new Server(serverHttp);
app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(_dirname + "/public"));
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);
app.use("/", vistaRouter);

socketServer.on("connection", async (socket) => {
  try {
    const data = await fs.promises.readFile("./productos.json", "utf-8");
    const listaDeProductos = JSON.parse(data);
    socket.emit("data", listaDeProductos);
  } catch (err) {
    console.log("error", err);
  }
});
