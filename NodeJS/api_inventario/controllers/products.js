import modelProduct from "../models/products.js"
import IA from "../middlewares/IA.js"
import { model } from "mongoose";

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
            let { id } = req.params
            let product = await modelProduct.findById(id)
            console.log(product.name)
            let AI = await IA("Vas a recibir el nombre de un producto Y quiero me devuelvas la descripcion que le harias a ese producto, quiero una descripcion corta no debe ser larga debe ser breve y solo la descripcion nada mas, no saludes solo entrega la descripcion", product.name)
            res.status(200).send(AI)
        } catch (error) {
            res.send(error)
        }
    },
    generatePrize: async (req, res) => {
        try {
            let { id } = req.params
            let product = await modelProduct.findById(id)
            console.log(product.name)
            let AI = await IA("Vas a recibir el nombre de un producto Y quiero me devuelvas una sugerencia de precio que le harias a ese producto, quiero solo el precio y el precio quiero que lo des en base a una unidad y aun precio en COP como quieras no te compliques", product.name)
            res.status(200).send(AI)
        } catch (error) {
            res.send(error)
        }
    }
}

export default endpointsProducts 