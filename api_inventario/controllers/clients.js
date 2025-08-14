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
           res.json(allcustomers).status(200).send("lleg7ue")
        } catch (error) {
         console.log(error)
        }
    },
    getClient: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    ModifyClient: async function (req, res) {
        try {

        } catch (error) {

        }
    },
    deleteClient: async () => {
        try {

        } catch (error) {

        }
    },
    recomendationClient: async () => {
        try {

        } catch (error) {

        }
    }
}
export default endpointsClients