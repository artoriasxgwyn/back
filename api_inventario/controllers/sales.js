import modelSales from "../models/sales.js"

const endpointsSales = {
    registerSales: async (req, res) => {
        try {
            let { idClient } = req.body
            const sale = new modelSales({ idClient });
            await sale.save()
            res.json(sale).status(200).send("venta guardado")
        } catch (error) {
            console.log(error)
            res.send("No ha sido exitoso el ingreso de la venta al sistema")
        }
    }, addProductsSales: async (req, res) => {
        try {
            let { idProduct, cantidad, idVenta } = req.body
            const sale = await modelSales.findById(idVenta);
            let product = { idProduct, cantidad }
            sale.products.push(product)
            await sale.save()
            res.json(sale).status(200).send("añadido de productos exitoso")
        } catch (error) {
            console.log(error)
            res.send("No ha sido exitoso los articulos asociados a la venta")
        }
    },
    getAllSales: async (req, res) => {
        try {
            let AllSales = await modelSales.find()
            res.json(AllSales).status(200).send("lleg7ue")
        } catch (error) {
            console.log(error)
        }
    },
    getSale: async (req, res) => {
        try {
            let { id } = req.params
            let sale = await modelSales.findById(id)
            console.log(sale)
            res.json(sale).status(200)
        } catch (error) {
            console.log(error)
            res.send("no lo encontre")
        }
    },
    getAllSaleOfCLient: async (req, res) => {
        try {
            let { id } = req.params
            console.log(typeof (id))
            const ventas = await modelSales.find({ 'idClient': id });
            console.log(ventas)
            res.json(ventas)
        } catch (e) {
            res.send(e)
        }
    },
    getAllSalesOfProducts: async (req, res) => {
        try {
           // let { id } = req.params
            console.log(typeof (id))
            const ventas = await modelSales.find({ 'products.idProduct': id });
            console.log(ventas)
            res.json(ventas)
        } catch (e) {
            res.send(e)
        }
    },

}

export default endpointsSales