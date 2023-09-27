const { Sequelize } = require('sequelize');

const databaseName = 'postgres';
const databaseUser = 'e-commerce';
const databasePassword = 'e-commerce';
const databaseHost = 'localhost';
const databasePort = 5666;

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: databaseHost,
  port: databasePort,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données :', error);
  });

module.exports = sequelize;
