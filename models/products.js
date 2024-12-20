'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A product can belong to many cart items
      Products.hasMany(models.Cart, {
        foreignKey: 'productId',
        as: 'cartItems'
      });
    };
  }
  Products.init({
    id: {
      allowNull: true,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    show_price: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: true,
      defaultValue: 'Active', // Default value is 'Active'
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sub_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    top_featured: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: true,
      defaultValue: 'Active', // Default value is 'Active'
    },
    addOns: {
      type: DataTypes.JSON, // Storing addons as a JSON array
      allowNull: true
    },
    images: {
      type: DataTypes.JSON, // Store file paths of the images as an array of strings
      allowNull: true
    },
    imageColors: {
      type: DataTypes.JSON, // Store file paths of the images as an array of strings
      allowNull: true
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Products',
  });
  
  return Products;
};