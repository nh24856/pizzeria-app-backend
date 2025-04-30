'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn('Orders', 'paymentMethod', {
      type: Sequelize.ENUM('MOMO', 'AirtelMoney', 'CreditCard'),
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    
  }
};
