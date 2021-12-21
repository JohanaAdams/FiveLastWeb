
require('./infraestructura/conectionDB')
const { validarToken,admin,estudiante} = require('./middleware/authjwt')
const jwt = require('jsonwebtoken')
const typeDefs = require('./typeDef')
const resolvers = require('./resolver')
const authRoute = require('./routes/auth.routes')

const express = require('express')
const { ApolloServer } = require('apollo-server-express')

const key = 'CLAVEDIFICIL';
const iniciarServidor =async () => {
    const api = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers,
            context: ({ req }) => {
                const token = req.headers.authorization;
               try {
                    const tipoUsuario = jwt.verify(token, key)
                    if (tipoUsuario) {
                        rol = tipoUsuario.rolesito
                        return { rol }
                    }
                } catch (error) {
                    console.log(error)
                }
                return {}
            }
        });
    await apollo.start()
    apollo.applyMiddleware({ app: api})
    /*api.use((request, response) => {
        response.send('API GraphQL (SixLastWeb)')
    })*/
    api.use(express.json()) //para trabajar co json
    api.use('/api', authRoute)
    api.get('./api/dashboard/admin', [validarToken,admin],(request, response) => {
        response.json("Soy el dashboard")
    })
    api.get('./api/dashboard/estudiante', [validarToken, estudiante], (request, response) => {
        response.json("Soy el dashboard")
    })
    api.listen('9092',()=>console.log('Inicio server'))
}
iniciarServidor()