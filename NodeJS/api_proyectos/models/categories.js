import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const modelCategorie = new Schema({
    name: String,
    description: String,
    isActive: Boolean,
    createdBy: ObjectId,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

export default mongoose.model("modelCategorie", modelCategorie);