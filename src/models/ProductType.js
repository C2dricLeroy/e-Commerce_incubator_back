const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductType = sequelize.define('productType', {
  product_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ProductType;
