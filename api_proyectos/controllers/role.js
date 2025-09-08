import modelRole from "../models/roles.js"

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
            let { name, description, isActive } = req.body
            console.log(name, description, isActive)
            let role = new modelRole({ name, description, isActive });
            await role.save()
            res.status(200).send("se ha registrado con exito")
        } catch (error) {
            res.send(error)
            console.log(error);
        };

    },
    updateRole: async (req, res) => {

    },
    deleteRole: async (req, res) => {

    }
}
export default endpointRoles;