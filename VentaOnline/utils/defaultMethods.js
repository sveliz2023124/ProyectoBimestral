import Category from '../src/product_category/category.model.js'
import User from '../src/users/user.model.js'
import { encrypt } from '../utils/encrypt.js'
import mongoose from 'mongoose'

export const categoryDefault = async()=>{
    try {
        let id = '67b2a0a4ba40e0c5a180faf8'
        let existCategory = await Category.findOne({_id:id})
        if(!existCategory){
            let newCategory = new Category({
                _id: new mongoose.Types.ObjectId('67b2a0a4ba40e0c5a180faf8'),
                name: 'defaultCategory',
                description: 'Default Category'
            })
            await newCategory.save()
            console.log('Category default created', newCategory)
        }
        console.log('Category default already exists')
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message:'General error',
                e
            }
        )
    }
}

export const DefaultAdmin = async()=>{
    try{
        const adminList=await User.findOne({role:'ADMIN'})
        if(!adminList){
            const defaultAdmin=new User(
                {
                    name: 'Sebastian',
                    surname: 'Veliz',
                    username: 'sveliz',
                    email: 'sveliz-2023124@kinal.edu.gt',
                    phone: '54899860',
                    password: await encrypt(`${process.env.ADMIN_PASSWORD}`),
                    role: 'ADMIN'
                }
            )
            await defaultAdmin.save()
            console.log('Default admin created successfully')
        }else{
            console.log('Admin user already exists')
        }
    }catch(e){
        console.error(e)
        return e
    }
}
