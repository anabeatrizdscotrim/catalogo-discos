'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const Disco = require('./disco')(sequelize, Sequelize.DataTypes);
const Artista = require('./artista')(sequelize, Sequelize.DataTypes);
const Genero = require('./genero')(sequelize, Sequelize.DataTypes);

Disco.associate = function (models) {
  Disco.belongsToMany(models.Artista, { through: 'DiscoArtista' });
  Disco.belongsToMany(models.Genero, { through: 'DiscoGenero' });
};

Artista.associate = function (models) {
  Artista.belongsToMany(models.Disco, { through: 'DiscoArtista' });
  Artista.belongsToMany(models.Genero, { through: 'ArtistaGenero' });
};

Genero.associate = function (models) {
  Genero.belongsToMany(models.Disco, { through: 'DiscoGenero' });
  Genero.belongsToMany(models.Artista, { through: 'ArtistaGenero' });
};

db.Disco = Disco;
db.Artista = Artista;
db.Genero = Genero;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
