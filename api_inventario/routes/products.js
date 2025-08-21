import express from "express"
import product from "../controllers/products.js"
import {validar} from "../middlewares/JWT.js"
const Router = express()

Router.get("/",validar,product.getAllProduct)
Router.get("/:id",validar,product.getProduct)
Router.get("/descripcion/:id",validar,product.generateDescription)
Router.get("/precio/:id",validar,product.generatePrize)
Router.post("/",validar,product.registerProduct)
Router.put("/:id",validar,product.modifyProduct)
Router.delete("/:id",validar,product.deleteProduct)

export default Router