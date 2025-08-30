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
        joinedAt: Date
    }],
    status: ObjectId,
    priority: String,
    starDate: Date,
    endDate: Date,
    estimatedHours: Number,
    actualHours: Number,
    budget: Number,
    isActive: Boolean,
    tags: [    ],
    createdAt: Date,
    updatedAt: Date
});

export default mongoose.model("modelProjects", modelProjects);
