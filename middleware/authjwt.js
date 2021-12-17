const jwt = require('jsonwebtoken')
const key ='CLAVEDIFICIL'

const validarToken = (request, response, next) => {
    const token = request.headers['authorization']
    if (!token) {
        return response.status(401).json({ response: "Token invalido" })
    }
    try {
        const tipoUsuario = jwt.verify(token, key)
        if (tipoUsuario) {
            request.tipoUsuario = tipoUsuario.rolesito
            next();
            return
        }
        return response.status(401).json({ response: "Token invalido" })
    } catch (error) {
        return response.status(401).json({ response: "Token invalido" })
    }
}
const admin = (request, response, next) => {
    if (request.tipoUsuario != "Admin") {
        return response.status(403).json({ response: "Permisos insuficientes" })
    }
    next();
}
const isLider = (rol) => {
    return rol === "Lider"
}
const isAdmin = (rol) => {
    return rol === "Admin"
}

const estudiante = (request, response, next) => {
    if (request.tipoUsuario != "Estudiante") {
        return response.status(403).json({ response: "Permisos insuficientes" })
    }
    next();
}
module.exports = {
    validarToken,
    admin,
    estudiante,
    isAdmin,
    isLider
}