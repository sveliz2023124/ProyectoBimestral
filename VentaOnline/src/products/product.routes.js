import {Router} from "express"
import {
    add,
    deleteProduct,
    getProduct,
    getProductById,
    updateProduct
} from './product.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/add', [validateJwt], add)
api.get('/', [validateJwt], getProduct)
api.get('/:id', [validateJwt], getProductById)
api.put('/:id', [validateJwt], updateProduct)
api.delete('/:id',[validateJwt], deleteProduct)

export default api