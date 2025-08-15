import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelSales = new Schema({
    idClient: { type: String },
    date: { type: Date, default: Date.now },
    products: [{
        idProduct: { type: String},
        cantidad: { type: Number}
    }]
});

export default mongoose.model("modelSales", modelSales) 
