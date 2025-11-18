import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const modelClients = new Schema({
    name: String,
    lastname: String,
    cedula: Number
});

export default mongoose.model("modelClient", modelClients)