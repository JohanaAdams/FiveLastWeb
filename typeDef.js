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
    objetivosGenerales:String
    presupuesto:Int
    lider: String
    nombre: String

    descripcion:String
    estado:String
    fase:String
    integrantes:[Usuario]
    
    

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
    clave:String
    tipoUsuario: String

    estado:String 
    correo: String
   
    
}
input ProjectInput{
        objetivosGenerales: String
        presupuesto: Int
        nombre:String
        lider: String

        descripcion: String       
        
        fase:String
        
    }
type Mutation{
    createUser(user:UserInput): String
    createProject(project:ProjectInput):String
    activeUser(identificacion:Int):String 
    deleteUser(ident:Int):String
    deleteProject(nombreProyecto:String):String
    insertUserToProject(identificacion:Int, nombreProyecto:String):String

    actualiceUser(identificacion:Int):String
}
`
module.exports = typeDefs