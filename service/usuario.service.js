const User = require('../model/usuarioModel')
//const buscarUsuarioPorIdentificacion = (identi) => User.find(user => user.identificacion === identi)
const buscarUsuarioPorIdentificacion = async (identificacion) => await User.findOne({ identificacion })
module.exports = {
    buscarUsuarioPorIdentificacion
}
