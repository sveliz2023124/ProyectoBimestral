import { Router } from "express"
import {
    add,
    deleteCategory,
    getCategory,
    getCategoryById,
    updateCategory,
} from './category.controller.js'
import {validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/add', [validateJwt],add)
api.get('/',[validateJwt] ,getCategory)
api.get('/:id', [validateJwt], getCategoryById)
api.put('/:id',[validateJwt], updateCategory)
api.delete('/:id', [validateJwt], deleteCategory)
export default api