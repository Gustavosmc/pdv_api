'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const ProductSale = sequelize.define('ProductSale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    description: {
      type: DataTypes.STRING(80),
      allowNull: false,
      defaultValue: ''
    },
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    tenant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {        
        model: 'Tenants',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {        
        model: 'Products',
        key: 'id'
      }
    },
    sale_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {        
        model: 'Sales',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {});
  ProductSale.associate = function(models) {
    ProductSale.belongsTo(models.Sale, {as: 'sale', foreignKey: 'sale_id'})
    ProductSale.belongsTo(models.Product, {as: 'product', foreignKey: 'product_id'})

  };

  ProductSale.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.updatedAt
    delete values.createdAt
    return values
  }


  return ProductSale;
};