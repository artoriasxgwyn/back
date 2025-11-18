import modelRole from "../models/roles.js";

const endpointRoles = {
    getRole: async (req, res) => {
        try {
            let roles = await modelRole.find()
            res.json(roles).send("ahi estan los roles")
        }
        catch (e) {

        }
    },
    addRole: async (req, res) => {
        try {
            let { name, description } = req.body
            let role = new modelRole({ name, description });
            await role.save()
            res.status(200).send("se ha registrado con exito")
        } catch (error) {
            res.send(error)
            console.log(error);
        };

    },
    updateRole: async (req, res) => {
        try {
            let { id } = req.params;
            let { name } = req.body;
            let updateAt = new Date();
            const role = await modelRole.findByIdAndUpdate(id,
                { name, updateAt },
                { new: true }
            );
            res.send(role)
        } catch (error) {
            res.send(error);
        };
    },
    deleteRole: async (req, res) => {
        try {
            let { id } = req.params;
            let isActive = true;
            let updateAt = new Date();
            let role = await modelRole.findById(id);
            if (role.name == "Admin") {
                res.status(403).send("se desactiva y se traga el programa")
            };
            const roleDelete = await modelRole.findByIdAndUpdate(id,
                { isActive, updateAt },
                { new: true }
            );
            res.send(roleDelete);
        } catch (error) {
            res.send(error)
        }

    },
    changeRole: async (req, res) => {
        try {
            let { id } = req.params;
            let role = await modelRole.findById(id);
            let { name, description } = req.body;
            let updateAt = new Date()
            if (role._id.toString() === "68c33d233832715b1f797def") {
                res.send("tiene que existir Admin");
            };
            const roleUpdate = await modelRole.findByIdAndUpdate(id,
                { name, description },
                { new: true }
            );
            res.send(roleUpdate);
        } catch (error) {
            res.send(error)
        }

    }
}
export default endpointRoles;