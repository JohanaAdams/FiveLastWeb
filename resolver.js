const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
var aes256 = require('aes256');

const listUsuarios = [
    {
        nombre: 'Ramon Castaño',
        identificacion: 123456789,
        estado: 'activo',
        email: 'ramon@gmail.com',
        perfil: 'estudiante'
    },
    {
        nombre: 'Ernesto',
        identificacion: 98765,
        estado: 'activo',
        email: 'ernesto@gmail.com',
        perfil: 'estudiante'
    },
    {
        nombre: 'Daniel Saavedra',
        identificacion: 12345,
        estado: 'activo',
        email: 'daniel@gmail.com',
        perfil: 'lider'
    },
]
const key = 'CLAVEDIFICIL';

const resolvers = {
    Query: {
        //usuarios: () => listUsuarios,
        usuario: (parent, args, context, info) => listUsuarios.find(user => user.identificacion === args.identificacion),
        usuarios: async () => await User.find({}),
        proyectos: async () => await Project.find({}).populate("integrantes"),
        getProject: async (parent, args, context, info) => await Project.findOne({ nombre: args.nombre }),
    },
    Mutation: {
        createUser: (parent, args, context, info) => {
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "Usuario creado")
                .catch(err => console.log(err));
            //.catch(err => "fallo la creacion");
        },
        createProject: (parent, args, context, info) => {
            const nuevoProyecto = new Project(args.project);
            return nuevoProyecto.save()
                .then(u => "Proyecto creado")
                .catch(err => console.log(err));
        },
        activeUser: (parent, args, context, info) => {
            return User.updateOne({ identificacion: args.identificacion }, { estado: "Activo" })
                .then(u => "Usuario Activo")
                .catch(err => "Fallo la activacion");
        },
        actualiceUser: (parent, args, context, info) => {
            return User.updateOne({ identificacion: args.identificacion }, { $set: { nombre: args.nombre } })
                .then(u => "Usuario Actualizado")
                .catch(err => "Fallo la activacion");
        },

        deleteUser: (parent, args, context, info) => {
            return User.deleteOne({ identificacion: args.ident })
                .then(u => "Usuario eliminado")
                .catch(err => "Fallo la eliminacion");
        },
        deleteProject: (parent, args, context, info) => {
            return Project.updateOne({ nombre: args.nombreProyecto }, { activo: false })
                .then(u => "Proyecto 'eliminado'")
                .catch(err => "Fallo la eliminacion");
        },

        insertUserToProject: async (parent, args, context, info) => {
            const user = await User.findOne({ identificacion: args.identificacion })
            if (user && user.estado === "Activo") {
                const project = await Project.findOne({ nombre: args.nombreProyecto })
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
    }
}
module.exports = resolvers
