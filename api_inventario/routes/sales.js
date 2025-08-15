import express from "express"
import sales from "../controllers/sales.js"

const Router = express.Router()

Router.get("/",sales.getAllSales)
Router.get("/:id",sales.getSale)
Router.get("/c/:id",sales.getAllSaleOfCLient)
Router.get("/p/:id",sales.getAllSalesOfProducts)
Router.post("/",sales.registerSales)
Router.post("/productos",sales.addProductsSales)
Router.put("/", () => {

})
Router.delete("/", () => {

})
export {Router};