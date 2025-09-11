import modelClient from "../models/clients.js"

const endpointsClients = {
    createClient: async function (req, res) {
        try {
            let { name, lastname, cedula } = req.body
            console.log(modelClient)
            const customer = new modelClient({ name, lastname, cedula });
            await customer.save()
            res.json(customer).status(200).send("cliente guardado")
        } catch (error) {
            console.log(error)
            res.send("No ha sido exitoso el ingreso del cliente al sistema")
        }
    },
    getAllClients: async (req, res) => {
        try {
            let allcustomers = await modelClient.find()
            res.json(allcustomers).status(200)
        } catch (error) {
            console.log(error)
        }
    },
    getClient: async (req, res) => {
        try {
            let { id } = req.params
            let customer = await modelClient.findById(id)
            console.log(customer)
            res.json(customer).status(200)
        } catch (error) {
            console.log(error)
            res.send("no lo encontre")
        }
    },
    ModifyClient: async function (req, res) {
        try {
            let { id } = req.params
            let { name, lastname } = req.body
            const customer = await modelClient.findByIdAndUpdate(id,
                { name, lastname },
                { new: true }
            );
            res.send(customer)
        } catch (error) {
            res.send(error)
        }
    },
    deleteClient: async (req,res) => {
        try {
            let { id } = req.params
            const customer = await modelClient.findByIdAndDelete(id);
            res.json(customer)
        } catch (error) {
            res.send(error)
        }
    },
    recomendationClient: async () => {
        try {

        } catch (error) {

        }
    }
}
export default endpointsClients