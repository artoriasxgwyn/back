import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelTask = new Schema({
    title: String,
    description: String,
    project: ObjectId,
    assignedTo: ObjectId,
    createdBy: ObjectId,
    status: ObjectId,
    priority: String,
    estimatedHours: Number,
    actualHours: Number,
    startDate: Date,
    dueDate: Date,
    completedAt: Date,
    tags: [

    ],
    isActive: Boolean,
    createdAt: { type: Date, default: Date.now },
    updateAt: Date
});

export default mongoose.model("modelTask", modelTask);
