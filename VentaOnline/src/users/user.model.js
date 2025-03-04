import { Schema, model } from "mongoose";

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLenght: [25, `Can't be overcome 25 chacarcters`]
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
        maxLenght: [25, `Can't be overcome 25 characters`]
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already taken'],
        lowerCase: true,

    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be 8 characters'],
        maxLenght: [16, `Can't be overcome 16 chacarcters`]
    },
    phone: {
        type: Number,
        required: [true, 'Phone is required'],
        minLength: [8, 'Phone must be 8 chacarcters'],
        maxLenght: [15, `Can't be overcome 15 characters`]
    },
    profilePicture:{
        type:String
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        uppercase: true,
        enum: ['CLIENT', 'ADMIN'],
        default: 'CLIENT'
    }
},
    {versionKey:false}
)

userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject()
    return user
}

export default model('user', userSchema)