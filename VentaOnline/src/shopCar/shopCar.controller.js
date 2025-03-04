import ShopCar from './shopCar.model.js'
import Product from '../products/product.model.js'
import mongoose from 'mongoose'

export const createCart = async (id)=>{
    try{
        const existingCart = await ShopCar.findOne({user:id})
        if(existingCart) {
            return res.status(404).send(
            {
                success:false,
                message:'You already have a shopping cart',
                existingCart
            }
        )
    }
    const newCart = new ShopCar(
        {
            user: id,
            products: [],
            subtotal: 0
        }
    )

    await newCart.save()
    return res.send(
        {
            success:true,
            message:'Shopping cart successfully created',
            newCart
        }
    )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                e
            }
        )
    }
}

export const addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body
        const { _id } = req.user

        let price = await Product.findOne({ _id: product });
        if (!price) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }

        let total = quantity * price.price

        let cart = await ShopCar.findOne({ user: _id })
        if (!cart) {

            cart = new ShopCar({
                user: _id,
                products: [],
                subtotal: 0
            })
        }

        cart.products.push({
            product: product,
            quantity: quantity,
            price: price.price,
            total: total
        })

        cart.subtotal = cart.products.reduce((subtotal, product) => {
            return subtotal + product.total;
        }, 0)

        await cart.save()
        return res.send({
            success: true,
            message: 'Product added to cart',
            cart
        })
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            success: false,
            message: 'General error',
            e
        })
    }
}

export const getCart = async(req,res)=>{
    try{
        let { _id } = req.user
        let cart = await ShopCar.findOne({user:_id})
        if(!cart) {
            return res.status(403).send(
                {
                    success:false,
                    message: 'Shopping cartt do not exist'
                }
            )
        }
        return res.send(
            {
                success:true,
                message: 'Shopping cartts found',
                cart
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success:false,
                message:'General error',
                e
            }
        )
    }
}

export const deleteCart = async(req,res)=>{
    try{
         let {id} = req.params
         let {_id} = req.user
         let producto = await Product.findOne({_id: id})
         console.log(producto)

         let cart = await ShopCar.findOne({user:_id})
         if(!cart) return res.status(404).send({ message: 'You do not have a shopping cart.'})

         let ObjectId =  mongoose.Types.ObjectId;
         let productIndex = cart.products.findIndex(product => product.product.equals(new ObjectId(id)));
         if(productIndex === -1) return res.status(404).send({ message: 'Product not found in shopping cart'})

         cart.products.splice(productIndex, 1)
         cart.subtotal = cart.products.reduce((subtotal, product)=>{
             return subtotal + product.total
         },0)
         await cart.save()
         return res.send({ message: 'Product removed from cart successfully'})
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success:false,
                message: 'General error',
                e
            }
        )
    }
}

export const update = async(req,res)=>{
    try{
        let { id } = req.params
        let { quantity } = req.body
        let { _id } = req.user
        let cart = await ShopCar.findOne({ user: _id })
        if (!cart) {
            return res.status(404).send(
                { 
                    success:false,
                    message: 'You dont have a shopping cart'
                }
            )
        }
        let ObjectId =  mongoose.Types.ObjectId;
        let productIndex = cart.products.findIndex(product => product.product.equals(new ObjectId(id)));
        console.log(productIndex)
        if (productIndex === -1) {
            return res.status(404).send(
                {
                    success:false,
                    message: 'Product not found in shopping cart' 
                }
            )
        }
        cart.products[productIndex].quantity = quantity
        cart.products[productIndex].total = quantity * cart.products[productIndex].price
        cart.subtotal = cart.products.reduce((subtotal, product) => subtotal + product.total, 0)
        await cart.save()
        return res.send(
                {
                    success:true,
                    message: 'Product quantity updated successfully', 
                    cart
                }
            )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success:false,
                message: 'General error',
                e
            }
        )
    }
}

export const clearCart = async (userId) => {
    try {
        const cart = await ShopCar.findOne({ user: userId })
        if (!cart) {
            console.log('You do not have a shopping cart.')
            return;
        }
        cart.products = []
        cart.subtotal = 0
        await cart.save()
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success:false,
                message: 'General error',
                e
            }
        )
    }
}