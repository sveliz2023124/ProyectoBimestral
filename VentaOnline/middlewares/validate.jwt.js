'use strict'

import jwt from 'jsonwebtoken'

export const validateJwt = async(req, res, next) => {
    try{
        let secretKey = process.env.SECRET_KEY
        let {authorizathion} = req.headers
        if(!authorizathion) return res.status(401).send(
            {
                message: 'Unauthorized'
            }
        )
        let user = jwt.verify(authorizathion, secretKey)
        req.user = user
        next()
    }catch(e){
        console.error(e)
        return res.status(401).send(
            {
                message: 'Invalid credentials'
            }
        )
    }
}