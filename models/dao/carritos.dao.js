import { ProductModel } from "../products.model.js";
import { Common } from "./common.dao.js";
import { ProductosDao } from "./productos.dao.js";
const InternDaoProductService = new ProductosDao(ProductModel);
export class CarritosDao extends Common {
  async GetProduct(ID, body) {
    const productlist = await InternDaoProductService.getAll();
    console.log(productlist);
    const product = await InternDaoProductService.getById(ID);
    if (product) {
      console.log(product.title);
    } else {
      console.log("no existe");
    }
  }
}
