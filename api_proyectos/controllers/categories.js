import modelCategorie from "../models/categories.js";

const functionCategories = {
    getCategories: async (req, res) => {
        try {
            let categories = await modelCategorie.find();
            res.json(categories).send("ahí están las categorías");
        }
        catch (e) {
            res.send(e);
        }
    },
    createCategorie: async (req, res) => {
        try {
            let { name, description, isActive } = req.body;
            let { uid } = req.uid;
            let createdBy = uid;
            const categorie = new modelCategorie({ name, description, isActive, createdBy });
            await categorie.save();
            res.send(categorie);
        } catch (error) {
            res.send(error);
        };
    },
    updateCategorie: async (req, res) => {
        try {
            let { id } = req.params;
            let { name, description, isActive } = req.body;
            const categorie = await modelCategorie.findByIdAndUpdate(id,
                { name, description, isActive },
                { new: true }
            );
            res.send(categorie);
        } catch (error) {
            res.send(error);
        }
    },
    deleteCategorie: async (req, res) => {
        try {
            let { id } = req.params;
            let isActive = false;
            const categorie = await modelCategorie.findByIdAndUpdate(id,
                { isActive },
                { new: true }
            );
            res.send(categorie);
        } catch (e) {
            res.send(e);
        }
    }
}

export default functionCategories;