import Category from './category.model.js'

export const test = (req, res)=>{
    res.send('all categorys')
}

export const add = async(req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send(
            {
                message: 'Category added successfully',
                category
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'Error registering user', 
                e
            }
        )
    }
}

export const getCategory = async(req,res)=>{
    try{
        const {limit = 20, skip = 0} = req.query
            let category = await Category.find()
                .skip(skip)
                .limit(limit)
    
            if(!category.length===0){
                return res.status(404).send(
                    {
                        success: false,
                        message:'Category not found'
                    }
                )
            }
            return res.send(
                {
                    succes: true,
                    message: 'Category found',
                    category
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

export const getCategoryById = async(req, res)=>{
    try {
        let {id} = req.params
        let category = await Category.findById(id)
        if(!category) return res.status(404).send(
            {
                succes: false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                succes: true,
                message: 'Category found', 
                category
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error',
                e
            }
        )
    }
}

export const updateCategory = async (req,res)=>{
    try{
        let data = req.body
        let{id} = req.params
        let category = await Category.findByIdAndUpdate(id, data, {new: true})
        if(!category) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Category updated successfully',
                category
            }   
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error',
                e
            }
        )
    }
}

export const deleteCategory = async(req, res)=>{
    try {
        let { id } = req.params
         let deletedCategory = await Category.findByIdAndDelete(id)
         if(!deletedCategory) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )
         return res.send(
            {
                success: true,
                message: 'Category deleted successfully', 
                deletedCategory
            }
        )
    } catch (e) {
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