import { Router } from 'express'
import {
    register,
    login,
    test,
    getClient,
    getUserById,
    updatePass,
    update,
    deleteUser
} from './user.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)

api.get('/test', [validateJwt], test)

//CRUD
api.get('/', [validateJwt], getClient)
api.get('/:id', [validateJwt], getUserById)
api.put('/pass/:id', [validateJwt], updatePass)
api.put('/:id', [validateJwt], update)
api.delete('/:id',[validateJwt], deleteUser)

export default api