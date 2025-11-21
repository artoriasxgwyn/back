import modelUser from "../models/users.js"
import modelRoles from "../models/roles.js"

const functionsUsers = {
    getUsers: async (req, res) => {
        try {
            let users = await modelUser.find();
            res.json(users).send("ahi estan los roles");
        }
        catch (e) {
            res.send(e);
        }
    },
    actualUser: async (req, res) => {
        try {
            let { uid } = req.body
            let user = await modelUser.findById(uid)
            res.status(200).send(user)
        } catch (error) {
            res.send(error)
            console.log(error);
        };

    },
    updateUser: async (req, res) => {
        try {
            let { uid } = req.uid
            let { firstName, lastName } = req.body;
            let updateAt = new Date();
            const user = await modelUser.findByIdAndUpdate(uid,
                { firstName, lastName, updateAt },
                { new: true }
            );
            res.send(user);
        } catch (error) {
            res.send(error);
        };
    },
    deleteUser: async (req, res) => {
        try {
            let { id } = req.params;
            let isActive = false;
            let updateAt = new Date();
            const user = await modelUser.findByIdAndUpdate(id,
                { isActive, updateAt },
                { new: true }
            );
            res.send(user);
        } catch (e) {
            res.send(e);
        }
    },
    changeRoleUser: async (req, res) => {
        try {
            let { id } = req.params;
            let { name } = req.body;
            let updateAt = new Date();
            let role = await modelRoles.findOne({ name });
            let globalRole = role._id;
            let user = await modelUser.findByIdAndUpdate(id,
                { globalRole, updateAt },
                { new: true }
            );
            res.send(user);
        } catch (error) {
            res.send(error)
        }

    }
}

export default functionsUsers;