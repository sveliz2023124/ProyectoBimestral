import Product from './product.model.js'

export const test = (req,res)=>{
    res.send('You have access to Products')
}

export const add = async(req,res)=>{
    try{
        let data = req.body
        let product = new Product(data)
        await product.save()
        return res.send(
            {
                success:true,
                message: 'Product added successfully'
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success:false,
                message: 'Error adding product'
            }
        )
    }
}

export const getProduct = async(req,res)=>{
    try{
        const {limit = 20, skip = 0} = req.query
        let product = await Product.find()
        .populate(
            {
                path: 'category',
                select: "description -_id"
            }
        )
            .skip(skip)
            .limit(limit)

        if(!product.length ===0){
            return res.status(404).send(
                {
                    success:false,
                    message:'Product not found'
                }
            )
        }
        return res.send(
            {
                success:true,
                message: 'Product found',
                product
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

export const getProductById = async(req,res)=>{
    try{
        const {limit = 20, skip = 0} = req.query
        let {id} = req.params
        let product = await Product.findById(id)
        .populate(
            {
                path: 'category',
                select: "description -_id"
            }
        )
                .skip(skip)
                .limit(limit)
        
        if(!product) return res.status(404).send(
            {
                success:false,
                message:'Product not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Product found',
                product
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

export const updateProduct = async(req,res)=>{
    try{
        let data = req.body
        let {id} = req.params
        let product = await Product.findByIdAndUpdate(id, data, {new:true})
        if(!product) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        return res.send(
            {
                success: true,
                message:'Product updated'
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

export const deleteProduct = async(req,res)=>{
    try{
        let {id} = req.params
        let deleteP = await Product.findByIdAndDelete(id)
        if(!deleteP) return res.status(404).send(
            {
                success:false,
                message: 'Product not found'
            }
        )
        return res.send(
            {
                success:true,
                message:'Product deleted successfully',
                deleteP
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

export const soldOut = async(req, res) => {
    try {
        let stock = 0
        let product = await Product.find({ stock: stock })
        return res.send(
            {
                success: true,
                message: 'Products out of stock',
                product
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            { 
                success: false,
                message: 'Error displaying sold out products' 
            }
        )
    }
}