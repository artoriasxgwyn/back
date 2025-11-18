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
            let { name, description } = req.body;
            let updateAt = new Date();
            const categorie = await modelCategorie.findByIdAndUpdate(id,
                { name, description, updateAt },
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
            let updateAt = new Date();
            const categorie = await modelCategorie.findByIdAndUpdate(id,
                { isActive, updateAt },
                { new: true }
            );
            res.send(categorie);
        } catch (e) {
            res.send(e);
        }
    }
}

export default functionCategories;