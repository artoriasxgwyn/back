import modelComment from "../models/comments.js";
import checkProjectPermissions from "../helpers/checkPermissions.js";

const functionComments = {
    // GET /api/projects/:id/comments - Comentarios del proyecto
    getComments: async (req, res) => {
        try {
            let { id } = req.params; // projectId
            let { uid } = req.uid;

            // Verificar acceso al proyecto
            const permissions = await checkProjectPermissions(uid, id, false);
            
            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            let comments = await modelComment.find({ projectId: id })
                .sort({ createdAt: -1 }); // Más recientes primero

            res.json(comments);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // POST /api/projects/:id/comments - Comentar en proyecto
    createComment: async (req, res) => {
        try {
            let { id } = req.params; // projectId
            let { uid } = req.uid;
            let { content } = req.body;

            // Verificar acceso al proyecto
            const permissions = await checkProjectPermissions(uid, id, false);
            
            if (!permissions.hasAccess) {
                return res.status(403).send(permissions.error);
            }

            if (!content || content.trim() === "") {
                return res.status(400).send("El contenido del comentario es requerido");
            }

            const comment = new modelComment({
                content: content.trim(),
                author: uid,
                projectId: id
                // editedAt, createdAt, updateAt se establecen por default
            });

            await comment.save();
            res.status(201).send(comment);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // PUT /api/comments/:id - Editar comentario
    updateComment: async (req, res) => {
        try {
            let { id } = req.params; // commentId
            let { uid } = req.uid;
            let { content } = req.body;

            // Buscar el comentario
            const comment = await modelComment.findById(id);
            if (!comment) {
                return res.status(404).send("Comentario no encontrado");
            }

            // Verificar que el usuario es el autor del comentario
            if (comment.author.toString() !== uid) {
                return res.status(403).send("Solo el autor puede editar este comentario");
            }

            if (!content || content.trim() === "") {
                return res.status(400).send("El contenido del comentario es requerido");
            }

            const updatedComment = await modelComment.findByIdAndUpdate(
                id,
                {
                    content: content.trim(),
                    editedAt: new Date(),
                    updateAt: new Date()
                },
                { new: true }
            );

            res.send(updatedComment);
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    },

    // DELETE /api/comments/:id - Eliminar comentario
    deleteComment: async (req, res) => {
        try {
            let { id } = req.params; // commentId
            let { uid } = req.uid;

            // Buscar el comentario
            const comment = await modelComment.findById(id);
            if (!comment) {
                return res.status(404).send("Comentario no encontrado");
            }

            // Verificar permisos: autor del comentario O admin/owner del proyecto
            const isAuthor = comment.author.toString() === uid;
            
            if (!isAuthor) {
                // Si no es el autor, verificar si es admin/owner del proyecto
                const projectPermissions = await checkProjectPermissions(uid, comment.projectId, true);
                if (!projectPermissions.hasAccess) {
                    return res.status(403).send("No tienes permisos para eliminar este comentario");
                }
            }

            await modelComment.findByIdAndDelete(id);
            res.send({ message: "Comentario eliminado correctamente" });
        } catch (error) {
            res.status(500).send("Error: " + error.message);
        }
    }
}

export default functionComments;