const jwt = require('jsonwebtoken')
const secret = require('../secret')
const model = require('../models/index')
const user = require('../controller/userController')
// const formatrest = require('../formatres')

//Format
//Authorization: B
const ChecktokenDB = (token) =>
    model.user_token.findAll({
        where:{
            token:token
        }
    })


const verifyToken = async (req,res,next) => {
    const header = req.headers['authorization']    
    const token = header && header.split(' ')[1]
    const checkJwtToken = (token,secret) => {
        return jwt.verify(token,secret)
    }
    if (token == null) return res.sendStatus(401)
    try{
        const b = await checkJwtToken(token,secret.jwtkey)
        console.log(b)
        const a = await ChecktokenDB(token)
        console.log(a)
        if (a){
            return next()
        }
        return res.sendStatus(401)
    }catch(err){
        // throw err
        return res.send(err)
    }
}



//     jwt.verify(token,secret.jwtkey,(err, user) => {
//         try{
//             // if(await user.checkUsernameOrPassword(user.username)){
//                 // return res.sendStatus(200)    
//             // }
//         }catch{

//         }
//         return res.sendStatus(401)
//     })
// }


module.exports = {
    verifyToken,
}