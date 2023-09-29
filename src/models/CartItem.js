const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Products');

const CartItem = sequelize.define('cartItem', {
  cart_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

CartItem.hasMany(Product, { foreignKey: 'product_id' });

module.exports = CartItem;
