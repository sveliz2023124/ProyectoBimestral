import Purchase from './purchase.model.js'
import ShopCar from '../shopCar/shopCar.model.js'
import Product from '../products/product.model.js'
import User from '../users/user.model.js'
import { clearCart } from '../shopCar/shopCar.controller.js'

export const addPurchase = async (req, res) => {
    try {
        let { _id } = req.user;
        let cart = await ShopCar.findOne({ user: _id }).populate('products.product')
        if (!cart) {
            return res.status(404).send({
                success: false,
                message: 'Shopping cart not found'
            })
        }

        let purchaseItems = cart.products.map(item => ({
            productId: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
            subtotal: item.total
        }))

        let total = cart.subtotal
        let { paymentMethod } = req.body
        let date = new Date()

        const purchase = new Purchase({
            user: _id,
            product: purchaseItems,
            total: total,
            paymentMethod: paymentMethod,
            date: date
        })

        await purchase.save()

        for (let item of cart.products) {
            let product = await Product.findById(item.product._id)
            if (!product) {
                console.log(`Product with ID ${item.product._id} not found.`)
                continue
            }
            product.stock -= item.quantity
            product.sellCount += item.quantity
            await product.save()
        }

        await clearCart(_id)

        return res.send({
            success: true,
            message: 'Purchase completed successfully',
            purchase
        });
    } catch (e) {
        console.error(e)
        return res.status(500).send({
            success: false,
            message: 'Error completing purchase',
            e
        })
    }
}

export const purchaseHistorial = async (req, res) => {
    try {
        let { _id } = req.user;
        let allPurchases = await Purchase.find({ user: _id }).populate('product', ['name'])
        return res.send({
            success: true,
            message: 'Purchases Historial',
            allPurchases
        })
    } catch (e) {
        console.error(e)
        return res.status(500).send({
            success: false,
            message: 'Error displaying purchase historial',
            e
        })
    }
}

export const createAndDownload = async (req, res) => {
    try {
        const { id } = req.params
        let { _id } = req.user

        const user = await User.findOne({ _id: _id });
        const purchase = await Purchase.findOne({ _id: id }).populate('product.productId')

        if (!purchase) {
            return res.status(404).send({
                success: false,
                message: 'Purchase not found'
            })
        }

        const invoice = {
            date: new Date(purchase.date).toLocaleDateString(),
            user: {
                name: user.name,
                surname: user.surname
            },
            products: purchase.product.map(item => ({
                productName: item.productId.name,
                quantity: item.quantity,
                unitPrice: item.price,
                subtotal: item.subtotal
            })),
            total: purchase.total
        }

        return res.send({
            success: true,
            message: 'Invoice generated successfully',
            invoice
        })
    } catch (e) {
        console.error(e)
        return res.status(500).send({
            success: false,
            message: 'Error generating invoice',
            e
        })
    }
}