import express from "express"
import clients from "../controllers/clients.js"
import {validar} from "../middlewares/JWT.js"

const Router = express()

Router.get("/:id",validar,clients.getClient)

Router.get("/",validar,clients.getAllClients)

Router.post("/",validar,clients.createClient)

Router.put("/:id",validar,clients.ModifyClient)

Router.delete("/:id",validar,clients.deleteClient)

export default Router ;