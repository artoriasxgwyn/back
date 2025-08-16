import express from "express"
import product from "../controllers/products.js"
const Router = express()

Router.get("/", product.getAllProduct)
Router.get("/:id", product.getProduct)
Router.get("/descripcion/:id", product.generateDescription)
Router.get("/precio/:id", product.generatePrize)
Router.post("/",product.registerProduct)
Router.put("/:id",product.modifyProduct)
Router.delete("/:id",product.deleteProduct)

export default Router