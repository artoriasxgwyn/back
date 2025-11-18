import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const modelUser = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    avatar: String,
    phone: String,
    globalRole: ObjectId,
    isActive: Boolean,
    isEmailVerified: Boolean,
    lastLogin: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

export default mongoose.model("modelUser", modelUser);
