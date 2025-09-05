import mongoose from "mongoose";

const Schema = mongoose.Schema;

const modelState = new Schema({
    name: String,
    description: String,
    type: String,
    isActive: Boolean,
    createdAt: { type: Date, default: Date.now },
    updateAt: Date
});

export default mongoose.model("modelState", modelState);