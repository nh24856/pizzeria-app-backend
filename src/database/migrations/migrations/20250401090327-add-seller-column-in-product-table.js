'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'sellerId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });

    // Optionally add an index to the foreign key for better performance
    await queryInterface.addIndex('Products', ['sellerId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Products', ['sellerId']);
    await queryInterface.removeColumn('Products', 'sellerId');
  }
};
