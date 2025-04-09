const { Sequelize } = require('sequelize');
// const config = require('./config.json');
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données MySQL établie avec succès.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données MySQL :', err);
  });

module.exports = sequelize;