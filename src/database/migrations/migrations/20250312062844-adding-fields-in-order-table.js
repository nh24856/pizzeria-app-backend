'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'deliveryAddress', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });

    await queryInterface.addColumn('Orders', 'preparedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Orders', 'deliveringAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Orders', 'deliveredAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Orders', 'cancelledAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Orders', 'cancelledBy', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Fix the status enum to match your controller logic
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.ENUM('pending', 'preparing', 'delivering', 'delivered', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'deliveryAddress');
    await queryInterface.removeColumn('Orders', 'preparedAt');
    await queryInterface.removeColumn('Orders', 'deliveringAt');
    await queryInterface.removeColumn('Orders', 'deliveredAt');
    await queryInterface.removeColumn('Orders', 'cancelledAt');
    await queryInterface.removeColumn('Orders', 'cancelledBy');

    // Revert the status enum
    await queryInterface.changeColumn('Orders', 'status', {
      type: Sequelize.ENUM('pending', 'processing', 'delivering', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending'
    });
  }
};
