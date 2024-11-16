const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Artista extends Model {
    static associate(models) {
      // o artista possui muitos discos
      Artista.hasMany(models.Disco, { foreignKey: 'artistaId' });
      // um artista pode estar associado a muitos gêneros musicais
      Artista.belongsToMany(models.Genero, { through: 'ArtistaGeneros' });
    }
  }

  Artista.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'Artista' }
  );

  return Artista;
};
