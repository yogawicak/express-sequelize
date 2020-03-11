const model = require('../models/index')
const {Op} = model.Sequelize
const formatrest = require('../formatres')
const userController = require('../controller/userController')

/**
 * Start Query List 
 */
const getProfileQuery = (username) => {
    return model.Profile.findAll({
        include: [{model:model.users,where:{username:username},attributes:[]}]
        })
}

const postProfileQuery = (params,idUser) => {
    const {
        first_name,
        last_name,
        gender,
        date_birth,
    } = params
    return model.Profile.create({
        first_name:first_name,
        last_name:last_name,
        date_birth:date_birth,
        gender:gender,
    })
}

const updateProfileQuery = (params) => {
    const {
        first_name,
        last_name,
        gender,
        date_birth,
    } = params
    return model.Profile.update({
        first_name:first_name,
        last_name:last_name,
        date_birth:date_birth,
        gender:gender,
    })
}


/**
 * End Query List 
 */



const getProfile = async (req,res) => {
    const username = res.locals.usernameToken.username
    try {
        const result = await getProfileQuery(username)
        console.log(result)
        return formatrest(result,'',null,res,200)
    } catch (err) {
        throw err
    }
}

const postProfile = async ( req,res ) => {
    const username = res.locals.usernameToken.username
    const ProfileId = await getProfileQuery(username)
    try {
        console.log(ProfileId)
        await postProfileQuery(req.body)
        await userController.updateProfileId(username,ProfileId[0].dataValues.id)
    } catch (err) {
        throw err
    }
}

module.exports = {
    getProfile,
    postProfile,
}