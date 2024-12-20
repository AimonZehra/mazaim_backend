'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      show_price: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: true,
        defaultValue: 'Active', // Default value is 'Active'
      },
      quantity: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sub_type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      top_featured: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: true,
        defaultValue: 'Active', // Default value is 'Active'
      },
      addOns: {
        type: Sequelize.JSON, // Storing addons as a JSON array
        allowNull: true
      },
      images: {
        type: Sequelize.JSON, // Store file paths of the images as an array of strings
        allowNull: true
      },
      imageColors: {
        type: Sequelize.JSON, // Store file paths of the images as an array of strings
        allowNull: true
      },
      discounted_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};