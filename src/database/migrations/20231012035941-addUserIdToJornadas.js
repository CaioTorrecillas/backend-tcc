'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jornadas', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios', // Nome da tabela "Usuarios"
        key: 'id', // Coluna de referência na tabela "Usuarios"
      },
      allowNull: false,
      onUpdate: 'CASCADE', // Ações em cascata na atualização
      onDelete: 'CASCADE', // Ações em cascata na exclusão
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jornadas', 'user_id');
  },
};
