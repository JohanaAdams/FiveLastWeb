const mongoose = require('mongoose')



const urlDB = 'mongodb+srv://omar:udea@cluster0.slx5d.mongodb.net/investigationProjects?retryWrites=true&w=majority'
mongoose.connect(urlDB);

const mongoDB = mongoose.connection;

mongoDB.on('open', _ => {
    console.log("Conectado a la bd")
})