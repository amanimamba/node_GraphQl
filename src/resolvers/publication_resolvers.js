const Publication = require('../models/publication');
const User = require('../models/user');

const publicationResolvers = {
  Query: {
    getPublication: async (_, { id }) => {
      try {
        return await Publication.findByPk(id, { include: 'auteur' });
      } catch (error) {
        console.error('Erreur lors de la récupération de la publication:', error);
        throw new Error('Impossible de récupérer la publication.');
      }
    },
    getAllPublications: async () => {
      try {
        return await Publication.findAll({ include: 'auteur' });
      } catch (error) {
        console.error('Erreur lors de la récupération des publications:', error);
        throw new Error('Impossible de récupérer les publications.');
      }
    },
    getPublicationsByAuthor: async (_, { auteurId }) => {
      try {
        const user = await User.findByPk(auteurId);
        if (!user) {
          throw new Error('Auteur non trouvé.');
        }
        return await Publication.findAll({ where: { auteurId } });
      } catch (error) {
        console.error('Erreur lors de la récupération des publications par auteur:', error);
        throw new Error('Impossible de récupérer les publications de cet auteur.');
      }
    },
  },
  Mutation: {
    createPublication: async (_, { titre, contenu, auteurId }) => {
      try {
        const user = await User.findByPk(auteurId);
        if (!user) {
          throw new Error('Auteur non trouvé.');
        }
        return await Publication.create({ titre, contenu, auteurId });
      } catch (error) {
        console.error('Erreur lors de la création de la publication:', error);
        throw new Error('Impossible de créer la publication.');
      }
    },
    updatePublication: async (_, { id, titre, contenu }) => {
      try {
        const [updatedRows] = await Publication.update({ titre, contenu }, { where: { id } });
        if (updatedRows > 0) {
          return await Publication.findByPk(id);
        }
        return null;
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la publication:', error);
        throw new Error('Impossible de mettre à jour la publication.');
      }
    },
    deletePublication: async (_, { id }) => {
      try {
        const deletedRows = await Publication.destroy({ where: { id } });
        if (deletedRows > 0) {
          return id;
        }
        return null;
      } catch (error) {
        console.error('Erreur lors de la suppression de la publication:', error);
        throw new Error('Impossible de supprimer la publication.');
      }
    },
  },
  Publication: {
    auteur: async (publication) => {
      try {
        return await User.findByPk(publication.auteurId);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'auteur de la publication:', error);
        throw new Error('Impossible de récupérer l\'auteur de cette publication.');
      }
    },
  },
};

module.exports = publicationResolvers;