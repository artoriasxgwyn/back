// models/comments.js
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelComment = new Schema({
    content: String,
    author: { type: ObjectId, ref: 'modelUser' },
    projectId: { type: ObjectId, ref: 'modelProjects' }, 
    editedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

export default mongoose.model("modelComment", modelComment);