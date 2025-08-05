import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const arrayProducts = new Schema({
    idProduct: String,
    cantidad: Number
});

const modelSales = new Schema({
    idClient: { type: String },
    idVenta: { type: Number },
    date: { type: Date, default: Date.now },
    products:[arrayProducts]
});

export {arrayProducts,modelSales}
