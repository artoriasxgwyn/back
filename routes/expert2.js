import Router from "express"
import { deleteCategoriasId, getHistorial, getCategoriasId, postCategorias, putCategoriasId } from "../controllers/expert2.js"

const router = Router()

router.get("/", getHistorial )

router.get("/:id",getCategoriasId)

router.post("/",postCategorias)

router.put("/:id",putCategoriasId)

router.delete("/:id",deleteCategoriasId)

export default router