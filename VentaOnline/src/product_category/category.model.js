import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    description:{
        type:String,
        required: true,
        minlength: [3, 'The description must be at least 3 characters long'],
    }
},
    {versionKey: false}
)

export default model('Category', categorySchema)