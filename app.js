const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser')
const userRoute = require('./routes/userRoute')
const verifyToken = require('./middleware/middleware')
const bengkelRoute = require('./routes/bengkelRoute')
const profileRoute = require('./routes/profileRoute')
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./openapi.json')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : true}))

//Trace Log Request
// app.use((req,res,next) => {
//   console.log("masuk middleware lagi")
//   next()
// })


//Routes Path
app.use('/api/user',userRoute)
app.use('/api/data',bengkelRoute)
app.use('/api/profile',profileRoute)

//TestAPI
app.get('/',(req, res) => { 
  res.send('Welcome') 
})

//Swagger Documentation
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDoc))

module.exports = app;
//MANTAP
// function checkTitle(title) {
//   return connection.query(`SELECT * FROM users Where title='${title}'`,{
//       type:Sequelize.QueryTypes.SELECT
//   })
//   .then(title => {
//       // console.log(title.length)
//       return title.length
//   })
//   .catch(err => {throw new Error(err)})
// }
// // const a = checkTitle('tes judul')
// // a.then(res => console.log(res))
// // checkTitle('tes judul')

// function insertTitle(title,body){
//   return connection.query(`INSERT INTO users SET title='${title}',body='${body}'`,{
//       type:Sequelize.QueryTypes.INSERT
//   })
//   .then((result) => {
//       return result
//   })
//   .catch(err => {throw new Error(err)})
//   }

// const addtitle = async (title,body) => {
//   try{
//       const [t,b] = [title,body]
//       const titleLength = await checkTitle(t)
//       if(titleLength != 0){
//           console.log("Judul sudah digunakan")
//       }else{
//           await insertTitle(t,b)
//           console.log('sukses input')
//       }
//   }catch(err){
//       console.log(err)
//   }
// }

// addtitle('tes judul3','tes body')
// // User.findOrCreate({
// //     title:'tes judul',
// //     body:'tes body',
// //     ignore:true
// // })
// //     .then((result) => {
// //         if (result.rows != 0) {
// //             console.log(result.rows)
// //             throw new Error('Data sudah ada')
// //         }
// //     })
// //     .catch((err) => err)