'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    foto: DataTypes.STRING,
    preco_variavel: {
      type: DataTypes.BOOLEAN,
    },
    tipo: {
      type: DataTypes.TINYINT,
    },
    estoque: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    status: DataTypes.TINYINT
  }, {});
  Produto.associate = function(models) {
    Produto.belongsToMany(models.Venda, {
      through: 'ProdutoVenda',
      as: 'vendas',
      foreignKey: 'produto_id',
      otherKey: 'venda_id'
    });
  };
  return Produto;
};