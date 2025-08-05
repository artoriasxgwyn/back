import express from "express"
import clients from "../controllers/clients.js"

const Router = express()

Router.get("/", (req,res) => {
    res.send("hola")
})
Router.post("/", (req,res) => {
    res.send("hola")
})
Router.put("/", (req,res) => {

})
Router.delete("/", (req,res) => {

})
export { Router };