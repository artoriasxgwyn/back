import express from "express"
import {Router as client} from "./routes/clients.js"
import products from "./routes/products.js"
import { Router as sales } from "./routes/sales.js"
import "dotenv/config"

const app = express()
app.use(express.json())
express().use("/api/clientes",client)
app.use("/api/productos",products)
app.use("/api/sales",sales)
app.listen(process.env.PORT, () => {
    console.log("Ay Dios");
});