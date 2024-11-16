const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Disco extends Model {
    static associate(models) {
      // um disco pertence a muitos gêneros musicais
      Disco.belongsToMany(models.Genero, { through: 'DiscoGeneros' });
      // um disco possui um artista
      Disco.belongsTo(models.Artista, { foreignKey: 'artistaId' });
    }
  }

  Disco.init(
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      anoLancamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      capa: {
        type: DataTypes.STRING, // url da imagem
        allowNull: true,
      },
      faixas: {
        type: DataTypes.JSON, 
        allowNull: false,
      },
    },
    { sequelize, modelName: 'Disco' }
  );

  return Disco;
};
