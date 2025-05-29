import Articulos from "../models/expert1.js";
import expert from "../class/clases.js";
 //const articulos = await Articulos.find();
 //console.log(articulos)

let expert1 = new expert(`medico`, "has vivido toda tu vida creyendo que el aborto es algo normal y has participado en varios abortos pero ya no piensas igual por que no te parece correcto por tus creencias religiosas")
console.log(expert1)
const httpArticulos = {
  getArticulos: async (req, res) => {
    try {
      const articulos = await Articulos.find();
      res.json({ articulos });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar los articulos" });
    }
  },
  getArticulosId: async (req, res) => {
    try {
      const { id } = req.params;
      const articulo = await Articulos.findById(id);
      res.json({ articulo });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la categoria" });
    }
  },
  postArticulo: async (req, res) => {
   try {
       const { codigo, nombre } = req.body;
       const articulo = new Articulos({ codigo, nombre });
       await articulo.save();
       res.json({ articulo });
     } catch (error) {
       res.status(400).json({ msg: "Error al guardar la cateforia" });
     }
  },
  putArticulo: async (req, res) => {
    try {
      const { id } = req.params;
      const { codigo, nombre } = req.body;
      const articulos = await Articulos.findByIdAndUpdate(id, {
        codigo,
        nombre,
      });
      res.json({ articulos });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la articulos" });
    }
  },
  deleteArticulo: async (req, res) => {
    try {
      const { id } = req.params;
      const articulos = await Articulos.findByIdAndDelete(id);
      res.json({ articulos });
    } catch (error) {
      res.status(400).json({ msg: "Error al buscar la articulos" });
    }
  },
};

const deleteCategoriasId = async (req, res) => {
  try {
    const { id } = req.params;
    const categorias = await Articulos.findByIdAndDelete(id);
    res.json({ categorias });
  } catch (error) {
    res.status(400).json({ msg: "Error al buscar la categoria" });
  }
};

export default httpArticulos