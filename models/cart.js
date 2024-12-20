'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
 
    
      // A cart belongs to a product
      Cart.belongsTo(models.Products, {
        foreignKey: 'productId',
        as: 'product'
      });
    
    }
  }
  Cart.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    title:DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};