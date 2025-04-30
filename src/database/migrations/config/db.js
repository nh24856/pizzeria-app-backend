const { Sequelize } = require('sequelize');
const config = require('./config.json'); // Ensure this path points correctly to your config.json

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        logging: config.development.logging
    }
);

sequelize.authenticate()
  .then(() => console.log('Connection established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
