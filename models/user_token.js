/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const user_token = sequelize.define('user_token', {
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    tableName: 'user_token',
    timestamps: false,
  });
  return user_token
};
