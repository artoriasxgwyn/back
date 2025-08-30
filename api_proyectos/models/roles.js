import mongoose from "mongoose";

const Schema = mongoose.Schema;

const modelRol = new Schema({
    name: String,
    description: String,
    isActive: Boolean,
    createdAt: Date,
    updateAt: Date
});

export default mongoose.model("modelRol",modelRol);