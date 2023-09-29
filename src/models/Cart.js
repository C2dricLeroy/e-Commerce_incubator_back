const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CartItem = require('./CartItem');

const Cart = sequelize.define('cart', {
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Cart_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Cart.hasMany(CartItem, { foreignKey: 'cart_id' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

module.exports = Cart;
