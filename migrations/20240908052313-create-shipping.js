'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shippings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shippingInfo: {
        type: Sequelize.JSON,
        allowNull: true,
      },
   // Cart items stored as JSON
   cartItems: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  // Order details
  totalPrice: {
    type: Sequelize.DECIMAL(10, 2), // 10 digits total, 2 after the decimal point
    allowNull: true,
  },
  deliveryFee: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  grandTotal: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shippings');
  }
};