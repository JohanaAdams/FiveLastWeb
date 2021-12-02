const { Schema, model} = require('mongoose')



const usuario = new Schema({
    nombre: { type: String, require: true },
    
    identificacion: { type: Number, require: true, unique: true },
    tipoUsuario: { type: String, require: true },
    estado: { type: String, default: "inactivo" },
    contrasena: { type: String, require: true }

})
module.exports = model('usuario', usuario)
/*module.exports = model('usuario', usuario, 'usuario') para que no cree agregando la s al nombre de la coleccion*/