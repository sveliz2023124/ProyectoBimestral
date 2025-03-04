'use strict'
import {Schema, model} from 'mongoose'

const purchaseSchema = new Schema({
   user:{
    type: Schema.ObjectId,
    ref: 'user'
   },
   product:[{
        productId:{
            type:Schema.ObjectId,
            ref: 'product',
            required: [true, 'Product is required']
        },
        quantity:{
            type:Number,
            required: [true, 'Quantity is required']
        },
        price:{
            type:Number,
            required: [true, 'Price is required']
        },
        subtotal:{
            type:Number,
            required: [true, 'Subtotal is required']
        }
   }],
   total:
    {
        type:Number,
        required: [true, 'Total is required']
    },
   paymentMethod:
    {
        type:String,
        required: [true, 'Payment method is required']
    },
   date:
    {
        type:Date,
        default: Date.now()
    }
},
    {versionKey: false}
)

export default model('purchase', purchaseSchema)

