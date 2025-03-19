import { model, Schema } from "mongoose";
import mongoosepaginatev2 from "mongoose-paginate-v2";

const productCollection = "products";
const productSchema = new Schema({
  title: String,
  price: Number,
  category: String,
  stock: Number,
  code: {
    type: String,
    unique: true,
  },
  discount: Boolean,
});
productSchema.plugin(mongoosepaginatev2);

/*
get - ALL 
get - BYID
UPDATE - BYID
DELETE - BYID
*/
export const ProductModel = model(productCollection, productSchema);
