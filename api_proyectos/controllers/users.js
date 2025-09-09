import modelUser from "../models/users.js"

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
            const user = await modelUser.findByIdAndUpdate(uid,
                { firstName, lastName },
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
            const user = await modelUser.findByIdAndUpdate(id,
                { isActive },
                { new: true }
            );
            res.send(user);
        } catch (e) {
            res.send(e);
        }
    }
}

export default functionsUsers;