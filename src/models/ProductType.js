const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Products');

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

ProductType.hasMany(Product, {
  foreignKey: 'product_type_id',
});

Product.belongsTo(ProductType, {
  foreignKey: 'product_type_id',
});

sequelize.sync();

module.exports = ProductType;
