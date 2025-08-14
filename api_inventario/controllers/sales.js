import { modelsales } from "../models/sales.js"

const endpointsSales = {
    registerSales: async (req, res) => {
        try {
            let { idCLient, idVenta } = req.body
            const sale = new modelsales({ idCLient, idVenta });
            await sale.save()
            res.json(sale).status(200).send("venta guardado")
        } catch (error) {
            console.log(error)
            res.send("No ha sido exitoso el ingreso de la venta al sistema")
        }
    }, addProductsSales: async (req, res) => {
        try {
            let { idProduct, cantidad, idVenta } = req.body
            const sale = await modelsales.findOne({ idVenta });
            let product = { idProduct, cantidad }
            sale.products.push(product)
            await sale.save()
        } catch (error) {
            console.log(error)
            res.send("No ha sido exitoso los articulos asociados a la venta")
        }
    },
    getAllSales: async (req, res) => {
        try {
            let AllSales = await modelProduct.find()
            res.json(AllSales).status(200).send("lleg7ue")
        } catch (error) {
            console.log(error)
        }
    },
    getAllSaleOfCLient: async (req, res) => {
        try {

        } catch (error) {

        }
    },
    getAllSalesOfProducts: async (req, res) => {
        try {

        } catch (error) {

        }
    },

}

export default endpointsSales