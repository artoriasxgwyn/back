import mongoose from "mongoose"

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Users = new Schema({
    UserName: String,
    Password: String
});

export default mongoose.model("Users", Users)