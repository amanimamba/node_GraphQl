const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');

const Publication = sequelize.define('Publication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenu: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  auteurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

Publication.belongsTo(User, { foreignKey: 'auteurId', as: 'auteur' });
User.hasMany(Publication, { foreignKey: 'auteurId', as: 'publications' });

module.exports = Publication;