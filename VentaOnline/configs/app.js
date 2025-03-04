import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/users/user.routes.js'
import categoryRoutes from '../src/product_category/category.routes.js'
import productRoutes from '../src/products/product.routes.js'
import shoppingCarRoutes from '../src/shopCar/shopCar.routes.js'
import purchaseRouter from '../src/purchase/purchase.routes.js'

const app = express() 
config()
const port = process.env.PORT


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use("/user", userRoutes)
app.use('/category', categoryRoutes)
app.use('/product', productRoutes)
app.use('/shop', shoppingCarRoutes)
app.use('/buy', purchaseRouter)

export const InitServer = ()=>{
    app.listen(port)
    console.log(`Server HTTPS is running in port ${port}`)
}