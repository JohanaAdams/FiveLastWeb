const mongoose = require('mongoose')



const urlDB = 'mongodb+srv://Omar:udea@cluster0.f60ts.mongodb.net/proyectoInvestigacion?retryWrites=true&w=majority'
mongoose.connect(urlDB);

const mongoDB = mongoose.connection;

mongoDB.on('open', _ => {
    console.log("Conectado a la bd")
})