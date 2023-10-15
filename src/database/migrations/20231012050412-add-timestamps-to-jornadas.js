'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('jornadas', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn('jornadas', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('jornadas', 'created_at');
    await queryInterface.removeColumn('jornadas', 'updated_at');
  },
};
