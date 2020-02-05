'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const ProdutoVenda = sequelize.define('ProdutoVenda', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING
    },
    valor: {
      type: DataTypes.DOUBLE,
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    venda_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.TINYINT
    }
  }, {});
  ProdutoVenda.associate = function(models) {
    ProdutoVenda.belongsTo(models.Venda, {as: 'venda', foreignKey: 'venda_id'})
    ProdutoVenda.belongsTo(models.Produto, {as: 'produto', foreignKey: 'produto_id'})

  };

  ProdutoVenda.gerarCodigo = (produtoId, vendaId) => {
    const ret = bcrypt.hashSync(`${new Date().getMilliseconds()}-${produtoId}-${vendaId}`, bcrypt.genSaltSync(8), null);
    return ret.slice(0, 45)
  }

  ProdutoVenda.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.updatedAt
    delete values.createdAt
    return values
  }

  ProdutoVenda.beforeCreate( async (instance, options) => {
    instance.codigo = ProdutoVenda.gerarCodigo(instance.produto_id, instance.venda_id)
    const produto = await sequelize.models.Produto.findOne({where: {id: instance.produto_id}})
    if(produto){
      if(! instance.descricao){
        instance.descricao = produto.descricao
      }
      if(! instance.valor){
        instance.valor = produto.preco
      }
    }
  })

  return ProdutoVenda;
};