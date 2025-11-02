const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false
});

const db = { sequelize, Sequelize };

db.Event = require('./event')(sequelize, Sequelize);

module.exports = db;
