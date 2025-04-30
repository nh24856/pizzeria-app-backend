'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_products');
  },

  async down (queryInterface, Sequelize) {
    
  }
};
