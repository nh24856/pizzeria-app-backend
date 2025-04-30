'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('Order_products');

    
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('Order_products');
  }
};
