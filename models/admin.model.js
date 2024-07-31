const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
      type:DataTypes.STRING,
        allowNull:false
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    passwordrepeat: {
      type: DataTypes.STRING, 
      allowNull: false,
    }
  });
  return Admin;
};
