const { addUserProject,
    createProject,
    deleteProject,
    proyectos,
    getProject } = require('./service/proyecto.service');
const { buscarUsuarioPorIdentificacion} = require('./service/usuario.service')
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
let aes256 = require('aes256');

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
        usuarios: async () => await User.find({}),
        usuario: (parent, args, context, info) => buscarUsuarioPorIdentificacion(args.identificacion),
        
        proyectos: async () => proyectos(),
        getProject: async (parent, args, context, info) => getProject( args.nombre ),
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
        deleteProject: (parent, args, context, info) => deleteProject(args.nombreProyecto),          
        
        insertUserToProject: async (parent, args, context, info) => addUserProject(args.identificacion, args.nombreProyecto),
        
        createUser: (parent, args, context, info) => {
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
                .then(u => "usuario creado")
                .catch(err => console.log(err));
        },
        createProject: (parent, args, context, info) => createProject(args.project),                      
        
        
    }
}
module.exports = resolvers
