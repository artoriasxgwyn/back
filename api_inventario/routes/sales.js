import express from "express"
import sales from "../controllers/sales.js"
import {validar} from "../middlewares/JWT.js"

const Router = express.Router()

Router.get("/",validar,sales.getAllSales)
Router.get("/:id",validar,sales.getSale)
Router.get("/c/:id",validar,sales.getAllSaleOfCLient)
Router.get("/p/:id",validar,sales.getAllSalesOfProducts)
Router.post("/",validar,sales.registerSales)
Router.post("/productos",validar,sales.addProductsSales)

export {Router};