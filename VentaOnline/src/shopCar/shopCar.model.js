import {Schema, model} from "mongoose"

const shopCarShema = new Schema(
    {
        user:{
            type: Schema.ObjectId,
            ref: 'user'
        },
        products:[
            {
                product:{
                    type: Schema.ObjectId,
                    ref: 'product',
                    required: [true, 'Products are required']
                },
                quantity:{
                    type:Number,
                    required: [true, 'Quantity is required']
                },
                price:{
                    type:Number,
                    required: [true, 'Price is required']
                },
                total:{
                    type:Number,
                    required: [true, 'Total is required']
                }
            }
        ],
        subtotal:{
            type:Number,
            required: [true, 'SubTotal is required']
        }
    },
        {versionKey:false}
)

export default model('shopCar', shopCarShema)