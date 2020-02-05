'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: DataTypes.STRING,
    usuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.TINYINT,
    nivel_permissao: DataTypes.TINYINT,
    token: DataTypes.VIRTUAL,

  }, {});

  Usuario.associate = function(models) {
       Usuario.hasMany(models.Venda, {as: 'vendas', foreignKey: 'id'})
  };

  Usuario.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.senha;
    return values;
  }

  Usuario.generateHash = senha => {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
  }

  Usuario.validPassword = (senha, usuario) => {
    return bcrypt.compareSync(senha, usuario.senha);
  }

  Usuario.validatePasswordSize = (senha) => {
    return senha.length >= 8
  }

  Usuario.beforeCreate((instance, options) => {
    if (instance.senha && instance.senha.length > 8)
      instance.senha = Usuario.generateHash(instance.senha);
  
  })
  
  return Usuario;
};