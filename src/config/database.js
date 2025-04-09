const { Sequelize } = require('sequelize');
const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
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