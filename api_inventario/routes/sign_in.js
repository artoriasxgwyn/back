import sign_in from "../controllers/sign_in.js"
import express from "express"

const router = express()

router.get("/",sign_in)

export default router
