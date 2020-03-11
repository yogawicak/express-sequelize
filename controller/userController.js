// const userModel = require('../models/users')
const model = require('../models/index')
const formatrest = require('../formatres')
const jwt = require('jsonwebtoken')
const secret = require('../secret')
const errorexc = 'Something Went Wrong'
const bcrypt = require('bcrypt')
const saltRound = 10

/**
 * START Query List
 */
const checkUsernameOrPassword = (username,password) => {
    if(username && password){
        return model.users.findAll({
            where: {
                username: username,
                password: password,
            }
        })
    }else{
        return model.users.findAll({
            where: {
                username: username
            },include: [{model:model.user_token}]
        })
    }
}

const checkIdByUsername = (username) => {
    return model.users.findOne({
        where:{
            username:username
        },
        attributes:['id']
    })
}

const updateProfileId = (username,ProfileId) => {
    return model.users.update({
        ProfileId:ProfileId,
        where:{
            username:username
        },
    })
}

/**
 * End Query List
 */


const register = async (req,res) => {
    const createUser = (username,password,token) => {
         return model.users.create({
            username: username,
            password: password,
            user_token:{
                token:token
            }
        },{
            include: model.user_token
        })
    }
    const hash = (password,saltRound) => {
        return bcrypt.hash(password,saltRound)
    }
    
    try{
        const { username , password } = req.body
        const token = jwt.sign({ username : username },secret.jwtkey)
        const cek = await checkUsernameOrPassword(username)
        const resultHash = await hash(password,saltRound)       
        if(cek.length > 0){
            return formatrest(null,'User Telah Digunakan',null,res,200)
        }else{
            await createUser(req.body.username,resultHash,token)
            return formatrest({ username:username , token:token }, 'User Berhasil dibuat',null,res,200)
        }
    }catch(err){
        console.log(err)
        return formatrest(null,errorexc,err.message,res,400)
    }
} 

const login = async (req,res) => {
    const { username , password } = req.body
    const compareHash = (password,hash) => {
        return bcrypt.compare(password,hash)
    }    
    try{
        const checkUsername = await checkUsernameOrPassword(username)
        if(checkUsername.length == 1){
            if(await compareHash(password,checkUsername[0].password) == true){
                return formatrest({ 'token':checkUsername[0].user_token.token },'Login Successfully',null,res,200)
            }else{
                return formatrest(null,'Password Incorrect',null,res,200)
            }
        }else{
            return formatrest(null,`Account Doesn't Exist`,null,res,200)
        }
    }catch(err){
            return formatrest(null,errorexc,err.message,res,400)
    }
}


module.exports = {
    login,
    register,
    checkUsernameOrPassword,
    checkIdByUsername,
    updateProfileId,
}