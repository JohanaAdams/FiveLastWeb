const { Schema, model} = require('mongoose')



const usuario = new Schema({
    nombre: { type: String, require: true },
    
    identificacion: { type: Number, require: true, unique: true },
    correo: { type: String, require: true },  
    tipoUsuario: { type: String, require: true },
    estado: { type: String, default: "inactivo" },
    clave: { type: String, require: true }

})
module.exports = model('usuarios', usuario, "usuarios")
/*module.exports = model('usuario', usuario, 'usuario') para que no cree agregando la s al nombre de la coleccion*/