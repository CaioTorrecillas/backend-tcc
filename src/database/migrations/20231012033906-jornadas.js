'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('jornadas', 
    { 
      id: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
      },
      origem: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destino: {
        type: Sequelize.STRING,
        allowNull: false
      },
      desc_aux: {
        type: Sequelize.STRING,
        allowNull: false
      },
      desc_pcd: {
        type: Sequelize.STRING,
        allowNull: false
      },

    });

  },

  down: async(queryInterface, Sequelize) => {
  
    await queryInterface.dropTable('users');

  }
};
