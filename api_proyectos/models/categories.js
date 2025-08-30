import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelCategorie = new Schema({
    name: String,
    description: String,
    isActive: Boolean,
    createdBy: ObjectId,
    createdAt: Date,
    updateAt: Date
})

export default mongoose.model("modelCategorie",modelCategorie)