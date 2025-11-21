// models/tasks.js (actualizado)
import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelTask = new Schema({
    title: String,
    description: String,
    project: { type: ObjectId, ref: 'modelProjects' },
    assignedTo: { type: ObjectId, ref: 'modelUser' },
    createdBy: { type: ObjectId, ref: 'modelUser' },
    status: { type: ObjectId, ref: 'modelState' },
    priority: String,
    estimatedHours: Number,
    actualHours: Number,
    startDate: Date,
    dueDate: Date,
    completedAt: Date,
    tags: [],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: Date
});

export default mongoose.model("modelTask", modelTask);