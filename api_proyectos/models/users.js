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
    lastLogin: Date,
    createdAt: { type: Date, default: Date.now },
    updateAt: Date
});

export default mongoose.model("modelUser", modelUser);
