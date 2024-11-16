'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      anoLancamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      capa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      faixas: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      artistaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Artistas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Discos');
  },
};
