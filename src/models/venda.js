'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venda = sequelize.define('Venda', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    troco: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    total_liquido: {
      type: DataTypes.VIRTUAL,
    },
    desconto: {
      type: DataTypes.DOUBLE
    },
    tipo_pagamento: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    valor_credito: {
      type: DataTypes.DOUBLE,
    },
    valor_debito: {
      type: DataTypes.DOUBLE,
    },
    valor_dinheiro: {
      type: DataTypes.DOUBLE,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {});
  Venda.associate = function(models) {
    Venda.belongsTo(models.Usuario, {as: 'usuario', foreignKey: 'usuario_id'})
    Venda.hasMany(models.ProdutoVenda, {as: 'produto_vendas', foreignKey: 'id'})
    Venda.belongsToMany(models.Produto, {
      through: 'ProdutoVenda',
      as: 'produtos',
      foreignKey: 'venda_id',
      otherKey: 'produto_id'
    });
  };

  return Venda;
};