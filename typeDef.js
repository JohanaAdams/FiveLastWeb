const { gql} = require('apollo-server-express')

const typeDefs = gql`
type Usuario{
    nombre: String
    identificacion: Int
    estado: String
    correo: String
    tipoUsuario: String
    
}
type Proyecto{  
    lider: String
    nombre: String
    
    
}
type Query{
    usuarios: [Usuario]
    usuario(identificacion: Int): Usuario
    proyectos:[Proyecto]
    getProject(nombre:String):Proyecto
}
input UserInput{
    nombre: String
    identificacion:Int
    correo: String
    clave:String
    tipoUsuario: String
}
type Mutation{
    createUser(user:UserInput): String
    activeUser(identificacion:Int):String
    deleteUser(ident:Int):String
    deleteProject(nombreProyecto:String):String
    insertUserToProject(identificacion:Int, nombreProyecto:String):String
}
`
module.exports = typeDefs