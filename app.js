const {Sequelize,DataTypes} = require('sequelize')
const connection = new Sequelize('sequelize-learn','root','',{
    dialect: "mysql",
});
let User = connection.define('user',{
    title:{
        type: DataTypes.STRING(10)
    },
    body:{
        type:DataTypes.TEXT
    },
})
// connection.authenticate()
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err))

// connection.sync()
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err))

//MANTAP
function checkTitle(title) {
    return connection.query(`SELECT * FROM users Where title='${title}'`,{
        type:Sequelize.QueryTypes.SELECT
    })
    .then(title => {
        // console.log(title.length)
        return title.length
    })
    .catch(err => {throw new Error(err)})
}
// const a = checkTitle('tes judul')
// a.then(res => console.log(res))
// checkTitle('tes judul')

function insertTitle(title,body){
    return connection.query(`INSERT INTO users SET title='${title}',body='${body}'`,{
        type:Sequelize.QueryTypes.INSERT
    })
    .then((result) => {
        return result
    })
    .catch(err => {throw new Error(err)})
    }

const addtitle = async (title,body) => {
    try{
        const [t,b] = [title,body]
        const titleLength = await checkTitle(t)
        if(titleLength != 0){
            console.log("Judul sudah digunakan")
        }else{
            await insertTitle(t,b)
            console.log('sukses input')
        }
    }catch(err){
        console.log(err)
    }
}

addtitle('tes judul3','tes body')

// User.findOrCreate({
//     title:'tes judul',
//     body:'tes body',
//     ignore:true
// })
//     .then((result) => {
//         if (result.rows != 0) {
//             console.log(result.rows)
//             throw new Error('Data sudah ada')
//         }
//     })
//     .catch((err) => err)