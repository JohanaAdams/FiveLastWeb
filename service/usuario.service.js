const User = require('../model/usuarioModel')

//const buscarUsuarioPorIdentificacion = (identi) => User.find(user => user.identificacion === identi)
const buscarUsuarioPorIdentificacion = async (identificacion) => await User.findOne({ identificacion })

const createUser = (user) => {
    const nuevoUsuario = new User(user);
    return nuevoUsuario.save()
        .then(u => "Usuario creado")
        .catch(err => console.log(err));
}
module.exports = {
    buscarUsuarioPorIdentificacion,
    createUser
}
