import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelComment = new Schema({
    content: String,
    author: ObjectId,
    projectId: ObjectId,
    editedAt: Date,
    createdAt: Date,
    updateAt:Date
});

export default mongoose.model("modelComment", modelComment);