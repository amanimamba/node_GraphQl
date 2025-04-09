const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path');
const sequelize = require('./src/config/database');
const resolvers = require('./src/resolvers');


// Fonction pour charger les fichiers GraphQL d'un dossier
const loadGraphQLFiles = (directory) => {
  const files = fs.readdirSync(directory);
  return files
    .filter(file => file.endsWith('.graphql'))
    .map(file => fs.readFileSync(path.join(directory, file), 'utf8'))
    .join('\n');
};

// Charger les définitions de type
const typeDefs = loadGraphQLFiles(path.join(__dirname, 'src/graphql/types'));

// Charger les requêtes et mutations
const queryDefs = loadGraphQLFiles(path.join(__dirname, 'src/graphql/queries'));
const mutationDefs = loadGraphQLFiles(path.join(__dirname, 'src/graphql/mutations'));

// Construire le schéma GraphQL
const schema = buildSchema(`
  ${typeDefs}
  type Query {
    ${queryDefs.replace(/extend type Query/g, '').trim()}
  }
  type Mutation {
    ${mutationDefs.replace(/extend type Mutation/g, '').trim()}
  }
`);

const app = express();
const port = 4000;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur GraphQL démarré sur http://localhost:${port}/graphql`);
    });
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation des modèles:', err);
  });