import express from "express"
import mongoose from "mongoose"
import  client  from "./routes/clients.js"
import products from "./routes/products.js"
import register from "./routes/sign_up.js"
import { Router as sales } from "./routes/sales.js"
import "dotenv/config";

const app = express()
app.use(express.json())
app.use("/api/clientes", client)
app.use("/api/productos", products)
app.use("/api/sales", sales)
app.use("/api/registro", register)

app.listen(process.env.PORT, () => {
    try {
        console.log(`Ay Dios ${process.env.PORT}`);
        mongoose.connect('mongodb://127.0.0.1/meVanACapar')
            .then(() => {
                console.log("hola dios me voy  morir")
            })
    } catch (error) {
        console.log(error)
    }

});

