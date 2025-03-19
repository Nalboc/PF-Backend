import { ProductModel } from "../products.model.js";
import { Common } from "./common.dao.js";
import { ProductosDao } from "./productos.dao.js";
const InternDaoProductService = new ProductosDao(ProductModel);
export class CarritosDao extends Common {
  async getCarritos() {
    try {
      const result = await this.model.find().populate("products.productoID");
      return result;
    } catch (e) {
      return null;
    }
  }
}
