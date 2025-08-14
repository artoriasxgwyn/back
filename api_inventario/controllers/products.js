import modelProduct from "../models/products.js"

const endpointsProducts = {
    registerProduct: async (req, res) => {
        try {
            let { name, stock } = req.body
            const product = new modelProduct({ name, stock });
            await product.save()
            res.json(product).status(200)
        } catch (error) {
            console.log(error)
            res.send("No ha sido exitoso el ingreso del producto al sistema")
        }
    },
    getAllProduct: async (req, res) => {
        try {
            let allproducts = await modelProduct.find()
            res.json(allproducts).status(200).send("lleg7ue")
        } catch (error) {
            console.log(error)
        }
    },
    getProduct: async (req, res) => {
        try {
            let { id } = req.params
            let product = await modelProduct.findById(id)
            console.log(product)
            res.json(product).status(200)
        } catch (error) {
            console.log(error)
            res.send("no lo encontre")
        }
    },
    modifyProduct: async (req, res) => {
        try {
            let { id } = req.params
            let { name, stock } = req.body
            const product = await modelProduct.findByIdAndUpdate(id,
                { name, stock },
                { new: true }
            );
            res.json(product)
        } catch (error) {
            res.send(error)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let { id } = req.params
            const product = await modelProduct.findByIdAndDelete(id);
            res.json(product)
        } catch (error) {
            res.send(error)
        }
    },
    generateDescription: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    generateDescriptionPrize: async (req, res) => {
        try {

        } catch (error) {

        }
    }
}

export default endpointsProducts