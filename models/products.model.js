import { model, Schema } from "mongoose";

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
/*
get - ALL 
get - BYID
UPDATE - BYID
DELETE - BYID
GET - BYTITLE
*/
export const ProductModel = model(productCollection, productSchema);
