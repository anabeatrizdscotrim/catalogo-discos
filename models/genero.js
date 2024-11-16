const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Genero extends Model {
    static associate(models) {
      // um gênero pode estar associado a muitos discos
      Genero.belongsToMany(models.Disco, { through: 'DiscoGeneros' });
      // um gênero pode estar associado a muitos artistas
      Genero.belongsToMany(models.Artista, { through: 'ArtistaGeneros' });
    }
  }

  Genero.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize, modelName: 'Genero' }
  );

  return Genero;
};
