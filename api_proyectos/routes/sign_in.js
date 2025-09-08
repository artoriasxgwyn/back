import express from "express";
import sign_in from "../controllers/sign_in.js"

const router = express();

router.post("/",sign_in);

export default router;