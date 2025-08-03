import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const modelProducts = new Schema({
    name: { type: String },
    Stock: { type: Number },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("modelProducts", modelProducts)