const User = require('../models/user');
const Publication = require('../models/publication');

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        return await User.findByPk(id, { include: 'publications' });
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        throw new Error('Impossible de récupérer l\'utilisateur.');
      }
    },
    getAllUsers: async () => {
      try {
        return await User.findAll();
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        throw new Error('Impossible de récupérer les utilisateurs.');
      }
    },
  },
  Mutation: {
    createUser: async (_, { nom, email }) => {
      try {
        return await User.create({ nom, email });
      } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        throw new Error('Impossible de créer l\'utilisateur.');
      }
    },
    updateUser: async (_, { id, nom, email }) => {
      try {
        const [updatedRows] = await User.update({ nom, email }, { where: { id } });
        if (updatedRows > 0) {
          return await User.findByPk(id);
        }
        return null;
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        throw new Error('Impossible de mettre à jour l\'utilisateur.');
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const deletedRows = await User.destroy({ where: { id } });
        if (deletedRows > 0) {
          return id;
        }
        return null;
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        throw new Error('Impossible de supprimer l\'utilisateur.');
      }
    },
  },
  User: {
    publications: async (user) => {
      try {
        return await Publication.findAll({ where: { auteurId: user.id } });
      } catch (error) {
        console.error('Erreur lors de la récupération des publications de l\'utilisateur:', error);
        throw new Error('Impossible de récupérer les publications de cet utilisateur.');
      }
    },
  },
};

module.exports = userResolvers;