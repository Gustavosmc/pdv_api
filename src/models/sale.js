'use strict';
const randomstring = require('randomstring')

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    money_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    credit_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    debt_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    change: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    payment_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    validate_code: {
      type: DataTypes.STRING(40),
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    tenant_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});

  Sale.associate = function(models) {
    Sale.belongsTo(models.User, {as: 'user', foreignKey: 'user_id'})
    Sale.hasMany(models.ProductSale, 
      {as: 'product_sales', foreignKey: 'sale_id', onDelete: 'CASCADE'})
    Sale.belongsToMany(models.Product, {
      through: 'ProductSale',
      as: 'products',
      foreignKey: 'sale_id',
      otherKey: 'product_id'
    });
  };

  Sale.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.validate_code;
    return values;
  }

  Sale.beforeCreate((instance, options) => {
    instance.validate_code = randomstring.generate(40)
  })

  return Sale;
};