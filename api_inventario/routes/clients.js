import express from "express"
import clients from "../controllers/clients.js"
import {validar} from "../middlewares/JWT.js"

const Router = express()

Router.get("/",validar,(req,res)=>{
res.send("hola amor")
})
Router.get("/all",clients.getAllClients)

Router.post("/",clients.createClient)
Router.put("/", (req, res) => {

})
Router.delete("/", (req, res) => {

})
export default Router ;