import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const historialEsquema = new Schema({
    id:{type:Number},
    vocacion:{type:String},
    respuesta:{type:String},
    createdAt:{type:Date, default:Date.now}
});

export default mongoose.model("Historial",historialEsquema)