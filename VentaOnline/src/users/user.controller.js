import User from '../users/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import argon from 'argon2'
import { generateJwt } from '../../utils/jwt.js'

export const test = (req,res)=>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
}

export const register = async(req,res)=>{
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        await user.save()
        return res.send({message : `Registered succesfully, can be logged with username: ${user.username}`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'General error with user registration',error})
    }
}

export const login = async(req,res)=>{
    try{
        let {userLogin, password} = req.body
        let user = await User.findOne(
            {
                $or:  [
                    {email: userLogin},
                    {username: userLogin}

                ]
            }
        )
        if (!user)return res.status(404).send({message: 'User not found'})
        if(user && await checkPassword(user.password,password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            
            let token = await generateJwt(loggedUser)
            return res.send({message: `Welcome ${user.name}`,
                loggedUser,
                token
            },
            )
        }
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error whit login'})
    }
}

export const getClient = async(req,res)=>{
    try{
        const {limit = 20, skip = 0} = req.query
            let users=await User.find()
                .skip(skip)
                .limit(limit)
    
            if(!users.length===0){
                return res.status(404).send(
                    {
                        success: false,
                        message:'User not found'
                    }
                )
            }
            return res.status(404).send(
                {
                    succes: false,
                    message: 'User found',
                    users
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'Error getting clients'
            }
        )
    }
}

export const getUserById = async(req, res)=>{
    try {
        let {id} = req.params
        let user = await User.findById(id)
        if(!user) return res.status(404).send(
            {
                succes: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                succes: false,
                message: 'User found: ', 
                user
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

export const update = async (req,res)=>{
    try{
        let data = req.body
        let {id} = req.params
        let user = await User.findByIdAndUpdate(id, data, {new: true})
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user
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

export const updatePass = async (req,res)=>{
    try{
        let {id} = req.params
        let {newPassword,oldPassword} = req.body
        let user = await User.findById(id)
        if(!user) return res.status(404).send(
            {
                succes: false,
                message: 'User not found',
            }
        ) 
        let compare = await argon.verify(user.password, oldPassword)
        if(!compare) return res.status(401).send(
            {
                succes:false,
                message: 'Old password is incorrect'
            }
        )
        user.password = await encrypt(newPassword)
        await user.save()

        return res.send(
            {
                succes: false,
                message: 'Password updated successfully'
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

export const deleteUser = async(req,res)=>{
    try{
        let {id} = req.params
        let deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser){
            return res.status(404).send(
                {
                    succes:false,
                    message: 'User not found'
                }
            )
        }
        return res.send(
            {
                succes:false,
                message: 'User deleted succssesfully'
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