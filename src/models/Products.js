const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CartItem = require('./CartItem');
const ProductType = require('./ProductType');

const Product = sequelize.define('products', {
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  DESCRIPTION: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

Product.hasMany(ProductType, { foreignKey: 'product_type_id' });
ProductType.belongsTo(Product);

sequelize.sync();

module.exports = Product;
