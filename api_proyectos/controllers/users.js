import modelUser from "../models/users.js"

const functionsUsers = {
    getUsers: async (req, res) => {
        try {
            console.log(req)
            let users = await modelUser.find()
            res.json(users).send("ahi estan los roles")
        }
        catch (e) {

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
            
            let { uid ,firstName, lastName } = req.body;
            console.log(firstName)
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
    }
}

export default functionsUsers;