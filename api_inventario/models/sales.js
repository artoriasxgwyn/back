import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelSales = new Schema({
    idClient: { type: String },
    date: { type: Date, default: Date.now },
    products: [{
        idProduct: { type: String, required: true },
        cantidad: { type: Number, required: true }
    }]
});

export default mongoose.model("modelSales", modelSales) 
