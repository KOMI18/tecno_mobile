const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tecno_mobile', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
