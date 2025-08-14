import express from "express"
import product from "../controllers/products.js"
const Router = express()

Router.get("/", product.getAllProduct)
Router.get("/:id", product.getProduct)
Router.post("/",product.registerProduct)
Router.put("/:id",product.modifyProduct)
Router.delete("/:id",product.deleteProduct)
export default Router