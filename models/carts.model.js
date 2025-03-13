import { model, Schema } from "mongoose";

const cartsCollection = "carts";
const cartsSchema = new Schema({
  products: [{ title: String, price: Number }],
  totalPrice: Number,
});
/*
get - ALL 
get - BYID
UPDATE - BYID
DELETE - BYID
*/
export const CartsModel = model(cartsCollection, cartsSchema);
