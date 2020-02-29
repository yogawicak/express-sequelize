'use strict'
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('users', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'username'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password'
    },
  },{
    tableName: 'users',
  },{
    instanceMethods: {
      generatehashPassword: (plainpassword) => {
        return bcrypt.hash(plainpassword,saltRounds,(err, hash) => {
          if(err){
            throw err
          }else{
            return hash
          }
        })
      },
      validatePassword: (plainpassword,hashpassdb) => {
        return bcrypt.compare(plainpassword,hashpassdb, (err, result) => {
          if(err){
            throw err
          }else{
            return result
          }
        })
        //result is true or false
      }
    }
  });
  User.associate = (models) => {
    //satu user hanya punya satu user tokn
    //function dijalan lalu passing parameter models.{nama tabel}
    console.log(models)
    User.hasOne(models.user_token)
    User.hasMany(models.dataBengkel,{as:'uploader_bengkel',foreignKey:'userId'})
  }

  Sequelize.sync({force:true})
  return User
};

// module.exports = {
//   users,
// }