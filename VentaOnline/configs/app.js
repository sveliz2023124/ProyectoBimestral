'use strict'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet' 

import userRoutes from '../src/users/user.routes.js'
import categoryRoutes from '../src/product_category/category.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(userRoutes)
    app.use(categoryRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(e){
        console.log('Server init failed', e)
    }
}