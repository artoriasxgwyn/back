import Router from "express"
import httpArticulos from "../controllers/expert1.js"

const router = Router()

router.get("/", httpArticulos.getArticulos)

router.get("/:id",httpArticulos.getArticulosId)

router.post("/",httpArticulos.postExpert1)

router.put("/:id",httpArticulos.putArticulo)

router.delete("/",httpArticulos.deleteHistorial)

router.delete("/:id",httpArticulos.deleteResponse)

export default router