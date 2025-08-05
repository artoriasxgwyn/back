import Login from "../controllers/sign_up.js"
import express from "express"

const router= express()

router.get("/",Login)

export default router
