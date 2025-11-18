import mongoose from "mongoose";

const Schema = mongoose.Schema;

const modelRol = new Schema({
    name: String,
    description: String,
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

export default mongoose.model("modelRol", modelRol);