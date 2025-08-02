import express from "express"
//import product from "../controllers/products.js"
const Router = express()

Router.get("/", (req,res) => {
   res.status(400)
   res.send("ijueputa")
})
Router.post("/", (req,res) => {

})
Router.put("/", (req,res) => {

})
Router.delete("/", (req,res) => {

})
export default Router