import modelStates from "../models/states.js";

const functionStates = {
    getStatesProjects: async (req, res) => {
        try {
            let states = await modelStates.find({ type: "Project" });
            res.json(states).send("ahí están los estados de proyectos");
        }
        catch (e) {
            res.send(e);
        }
    },
    getStatesTask: async (req, res) => {
        try {
            let states = await modelStates.find({ type: "Task" });
            res.json(states).send("ahí están los estados de tareas");
        }
        catch (e) {
            res.send(e);
        }
    },
    createState: async (req, res) => {
        try {
            let { name, description, type } = req.body;
            let updateAt = new Date();
            const state = new modelStates({ name, description, type, updateAt });
            await state.save();
            res.send(state);
        } catch (error) {
            res.send(error);
        };
    },
    updateState: async (req, res) => {
        try {
            let { id } = req.params;
            let { name, description, type } = req.body;
            let updateAt = new Date();
            const state = await modelStates.findByIdAndUpdate(id,
                { name, description, type, updateAt },
                { new: true }
            );
            res.send(state);
        } catch (error) {
            res.send(error);
        }
    }
}

export default functionStates;