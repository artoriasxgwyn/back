import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelProjects = new Schema({
    name: String,
    description: String,
    categorie: ObjectId,
    owner: ObjectId,
    members: [{
        user: ObjectId,
        role: ObjectId,
        joinedAt: Date,
        default: []
    }],
    status: ObjectId,
    priority: String,
    starDate: Date,
    endDate: Date,
    estimatedHours: Number,
    actualHours: Number,
    budget: Number,
    isActive: { type: Boolean, default: true },
    tags: {
        type: [],
        default: []
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

export default mongoose.model("modelProjects", modelProjects);
