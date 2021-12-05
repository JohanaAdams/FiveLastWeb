const { Schema, model } = require('mongoose')

const project = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    lider: String,
    descripcion: String,
    presupuesto: Number,
    fechaInicio: {
        type: Date,
        default: new Date()
    },
    estado: String,
    fase: String,
    objetivosGenerales: String,
    activo: {
        type: Boolean,
        default: true
    },
    integrantes:
        [{
            ref: "usuarios",
            type: Schema.Types.ObjectId
        }]
},
    /* {
         timestamps: true
     }*/
)
module.exports = model('proyectos', project)