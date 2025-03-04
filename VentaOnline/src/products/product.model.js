import { Schema, model } from "mongoose"

const productSchema = Schema(
    {
        name:{
            type:String,
            required: [true, 'Name is required'],
        },
        description:{
            type:String,
            required: [true, 'Description is required'],
        },
        price:{
            type:Number,
            required: [true,'Price is required']
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        stock:{
            type:Number,
            required: [true, 'Stock is required'],
        }
    },
    {versionKey: false}
)

export default model('product', productSchema)