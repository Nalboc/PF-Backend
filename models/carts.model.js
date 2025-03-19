import { model, Schema } from "mongoose";

const cartsCollection = "carts";
const cartsSchema = new Schema({
  products: [
    {
      productoID: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    },
  ],
  totalPrice: Number,
});
/*
get - ALL 
get - BYID
UPDATE - BYID
DELETE - BYID
*/
export const CartsModel = model(cartsCollection, cartsSchema);
