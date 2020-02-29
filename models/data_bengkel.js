/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const data_bengkel = sequelize.define('dataBengkel', {
    idBengkel: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id_bengkel'
    },
    namaBengkel: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nama_bengkel'
    },
    alamatBengkel: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'alamat_bengkel'
    },
    noTelponBengkel: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'no_telpon_bengkel'
    },
    jamBuka: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'jam_buka'
    },
    jamTutup: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'jam_tutup'
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'Latitude'
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      field: 'Longitude'
    },
    imgBengkel: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'img_bengkel'
    }
  }, {
    tableName: 'data_bengkel'
  });
  // data_bengkel.associate = (models) => {
  //   data_bengkel.hasMany(models.User,{as: 'uploader_bengkel'})
  // }
  return data_bengkel
};
