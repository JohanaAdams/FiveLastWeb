
const Project = require('../model/proyectoModel')
const User = require('../model/usuarioModel')

const addUserProject = async (identificacion, nombreProyecto) => {
    const user = await User.findOne({ identificacion })
    if (user && user.estado === "Activo") {
        const project = await Project.findOne({ nombre: nombreProyecto })
       //if (project && project.estado === "Activo") {
       if (project && project.activo) {
            if (project.integrantes.find(i => i == user._id)) {
                return "El usuario ya pertenece al proyecto indicado"
            } else {
                await Project.updateOne({ nombre: args.nombreProyecto }, { $push: { integrantes: user._id } })
                return "Usuario adicionado correctamente"
            }
        } else {
            return "Proyecto no valido para adicionar un integrante, consulte al administrador"
        }

    } else {
        return "Usuario no valido"
    }
}
const createProject = (project) => {
        const nuevoProyecto = new Project(project);
        return nuevoProyecto.save()
            .then(u => "Proyecto creado")
            .catch(err => console.log(err));
}

const deleteProject = (nombreProyecto) => {
        return Project.updateOne({ nombre: nombreProyecto }, { estado: "inactivo" })
        //return Project.updateOne({ nombre: nombreProyecto }, { activo: false })
            .then(u => "Proyecto 'eliminado'")
            .catch(err => "Fallo la eliminacion");
}

const proyectos = async () => await Project.find({}).populate("integrantes")

const getProject = async (nombre) => await Project.findOne({ nombre })

module.exports = {
    addUserProject,
    createProject,
    deleteProject,
    proyectos,
    getProject
}