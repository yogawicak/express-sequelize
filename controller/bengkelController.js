const model = require('../models/index')
const {Op} = model.Sequelize
const formatrest = require('../formatres')

const getBengkel = async (req,res) => {
    const getData = (nama) => {
        return model.dataBengkel.findAll({
           where : {
               nama_bengkel : {
                   [Op.like]: `%${nama}%`
               }
           }    
        })
    }
    try{
        const result = await getData(req.query.nama)
        console.log(result)
        return formatrest(result,'Result',null,res)
    }catch(err){
        throw err
    }
}

module.exports = {
    getBengkel,
}