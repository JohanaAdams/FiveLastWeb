const { addUserProject,
    createProject,
    createUser,
    deleteProject,
    proyectos,
    getProject } = require('./service/proyecto.service');
const { buscarUsuarioPorIdentificacion } = require('./service/usuario.service')
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
let aes256 = require('aes256');
const { isLider } = require('./middleware/authjwt');
const jwt = require('jsonwebtoken')


const key = 'CLAVEDIFICIL';

const resolvers = {
    Query: {
        //usuarios: () => listUsuarios,
        usuarios: async () => await User.find({}),
        usuario: (parent, args, context, info) => buscarUsuarioPorIdentificacion(args.identificacion),
        //proyectos: async () => proyectos(),
        proyectos: async (parent, args, context, info) => {
            return proyectos()
        },
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
               // .catch(err => console.log(err));
            .catch(err => "fallo la creacion");
           /* const nuevoUsuario = new User(args.user);
            return nuevoUsuario.save()*/
           
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
            //if (isLider(context.rol)) {
                 return User.deleteOne({ identificacion: args.ident })
                     .then(u => "Usuario eliminado")
                     .catch(err => "Fallo la eliminacion");
            //}   
            
        },
        deleteProject: (parent, args, context, info) => {
            //if (isAdmin(context.rol)) {
            if (isLider(context.rol)) {
                deleteProject(args.nombreProyecto)
            }
        },
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
        
        
        createProject: (parent, args, context, info) => {
           /* if (isLider(context.rol)) { 
            createProject(args.project)                      
               
            }*/
            createProject(args.project)
    },
        autenticar: async (parent, args, context, info) => {
            try {
                const usuario = await User.findOne({ correo: args.usuario })
                if (!usuario) {
                    return "Verique usuario y contrasena"
                }

                const claveDesencriptada = aes256.decrypt(key, usuario.clave)
                if (args.clave != claveDesencriptada) {
                    return "Verique usuario y contrasena"
                }
                const token = jwt.sign({
                    rolesito: usuario.tipoUsuario
                }, key, { expiresIn: 60 * 60 * 2 })

                return token
            } catch (error) {
                console.log(error)
            }
        }
    }
}     
module.exports = resolvers
