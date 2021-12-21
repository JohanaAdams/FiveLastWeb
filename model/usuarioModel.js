const { Schema, model} = require('mongoose')



const usuario = new Schema({
    nombre: { type: String, required: true },
    
    identificacion: { type: Number, required: true, unique: true },
    correo: { type: String, unique: true },  
    tipoUsuario: { type: String, required: true },
    estado: { type: String, default: "inactivo" },
    clave: { type: String, required: true }

})
module.exports = model('usuarios', usuario, "usuarios")
/*module.exports = model('usuario', usuario, 'usuario') para que no cree agregando la s al nombre de la coleccion*/