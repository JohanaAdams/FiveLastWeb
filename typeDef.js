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
    descripcion:String
    estado:String
    fase:String
    integrantes:[Usuario]
    presupuesto:Int
    objetivosGenerales:String

}
type Query{
    usuarios: [Usuario]
    usuario(identificacion: Int): Usuario
    proyectos:[Proyecto]
    getProject(nombre:String):Proyecto
}
input UserInput{
    estado:String
    nombre: String
    identificacion:Int
    correo: String
    clave:String
    tipoUsuario: String
}
input ProjectInput{
        nombre:String
        lider: String
        descripcion: String
        objetivosGenerales: String
        fase:String
        presupuesto: Int
    }
type Mutation{
    createUser(user:UserInput): String
    createProject(project:ProjectInput):String
    activeUser(identificacion:Int):String
    actualiceUser(identificacion:Int):String
    deleteUser(ident:Int):String
    deleteProject(nombreProyecto:String):String
    insertUserToProject(identificacion:Int, nombreProyecto:String):String
}
`
module.exports = typeDefs