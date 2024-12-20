'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shipping.init({
    shippingInfo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
 // Cart items stored as JSON
 cartItems: {
  type: DataTypes.JSON,
  allowNull: true,
},
// Order details
totalPrice: {
  type: DataTypes.FLOAT,
  allowNull: true,
},
deliveryFee: {
  type: DataTypes.FLOAT,
  allowNull: true,
},
grandTotal: {
  type: DataTypes.FLOAT,
  allowNull: true,
},

  }, {
    sequelize,
    modelName: 'Shipping',
  });
  return Shipping;
};