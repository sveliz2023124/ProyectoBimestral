import { Router } from "express"
import {
    add,
    deleteCategory,
    getCategory,
    getCategoryById,
    update,
} from './category.controller.js'
import {validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/add', [validateJwt],add)
api.get('/categories/categories',[validateJwt] ,getCategory)
api.get('/category/:id', [validateJwt], getCategoryById)
api.put('/category/:id',[validateJwt], update)
api.delete('/category/:id', [validateJwt], deleteCategory)
export default api