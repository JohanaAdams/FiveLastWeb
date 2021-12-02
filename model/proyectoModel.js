const { Schema, model} = require('mongoose')

const project = new Schema({
    nombre: { type: String, required: true, unique: true },
    lider: String,
    descripcion: String,
    fechaInicio: { type: Date, default: new Date() },
    estado: String,
    activo: { type: Boolean, default: true },
    integrantes: [Number]

})
module.exports = model('proyectos',project)