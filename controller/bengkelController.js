const model = require('../models/index')
const {Op} = model.Sequelize
const formatrest = require('../formatres')
const userController = require('./userController')


const getData = (nama) => {
    return model.dataBengkel.findAll({
        where : {
            nama_bengkel : {
                [Op.like]: `%${nama}%`
            }
        }    
    })
}


const postBengkelQuery = (params,userId,username) => {    
    const {
        nama_bengkel,
        alamat_bengkel,
        no_telpon_bengkel,
        jam_buka,
        jam_tutup,
        Latitude,
        Longitude,
        img_bengkel,
    } = params
    // console.log(params)
    return model.dataBengkel.create({
            namaBengkel: nama_bengkel,
            alamatBengkel: alamat_bengkel,
            noTelponBengkel: no_telpon_bengkel,
            jamBuka: jam_buka,
            jamTutup: jam_tutup,
            latitude: Latitude,
            longitude: Longitude,
            imgBengkel: img_bengkel,
            userId: userId,
    },{
        where:{
            id:''
        }
    }
    // ,{
    //     include: [{model:model.users,as:'uploader_bengkel'}]
    // }
    )
}

const updateBengkelQuery = (params) => {
    const {
        nama_bengkel,
        alamat_bengkel,
        no_telpon_bengkel,
        jam_buka,
        jam_tutup,
        Latitude,
        Longitude,
        img_bengkel,
    } = params

    return model.dataBengkel.update({
            namaBengkel: nama_bengkel,
            alamatBengkel: alamat_bengkel,
            noTelponBengkel: no_telpon_bengkel,
            jamBuka: jam_buka,
            jamTutup: jam_tutup,
            latitude: Latitude,
            longitude: Longitude,
            imgBengkel: img_bengkel,
            userId: userId,
    })
}


const getBengkel = async (req,res) => {
    try{    
        const result = await getData(req.query.nama)
        console.log(res.locals.usernameToken.username)
        // console.log(result)
        return formatrest(result,'Result',null,res)
    }catch(err){
        console.log(req.body)
        // throw err
    }
}

const postBengkel = async (req,res) => {
    try {
        const idUser = await userController.checkIdByUsername(res.locals.usernameToken.username)
        console.log(idUser.dataValues.id)
        const result = await postBengkelQuery(req.body,idUser.dataValues.id)
        console.log(result.dataValues.idBengkel)
        return formatrest(result,'Data Record Succesfully',null,res)
        // if(await postBengkelQuery(req.body)){
        //     // console.log(await postBengkelQuery(req.body))
        //     // if(await userController.updateBengkelIdQuery(res.locals.usernameToken.username)){
                
        //     // }

        // } 
    } catch (error) {
        throw error
        console.log(error.message)
        return formatrest(req.body,'Something Went Wrong',error,res)
    }
}

const updateBengkel = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    getBengkel,
    postBengkel
}