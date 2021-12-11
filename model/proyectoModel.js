const { Schema, model } = require('mongoose')

const project = new Schema({
   /* identificador: {
        type: String,
        require: true,
        unique:true
    },*/
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    
    descripcion: String,
    objetivosGenerales: String,
    objetivosEspecificos: [String],
    presupuesto: Number,
    fechaInicio: {
        type: Date,
        default: new Date()
    },
    fecha_terminacion: Date,
    estado: {
        type: String,
        default: "Activo"
    },
    fase: String,
    lider: String,
    integrantes:
        [{
            type: Schema.Types.ObjectId,
            ref: "usuarios"
            
        }]
},
    /* {
         timestamps: true
     }*/
)
module.exports = model('proyectos', project)